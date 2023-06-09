import { SongDetail, SongUrl } from '@service/song'
import { getPlaylistAll } from '@service/songList'
import type { SongType } from '@type/common'
import { Howl, Howler } from 'howler'
import _ from 'lodash'

import { events } from '@/application/Pubsub'
import { albumInfo } from '@/service/album'

/**
 * @readonly
 * @enum {string}
 */
const UNPLAYABLE_CONDITION = {
  PLAY_NEXT_TRACK: 'playNextTrack',
  PLAY_PREV_TRACK: 'playPrevTrack',
}

class Player {
  // 播放器状态
  _howler: Howl | null
  /** 是否正在播放中 */
  _playing: boolean
  /** 当前播放歌曲的进度 */
  private _progress: number
  _enabled: boolean
  /** 播放模式
   * - 0-列表播放 1-列表循环 2-随机播放 3-单曲循环 4-心动模式 */
  private _playMode: number
  /** 音量 0 to 1 */
  private _volume: number
  /** 用于保存静音前的音量 */
  _volumeBeforeMuted: number
  _personalFMLoading: boolean // 是否正在私人FM中加载新的track
  _personalFMNextLoading: boolean // 是否正在缓存私人FM的下一首歌曲

  // 播放信息
  /** 播放列表 */
  private _list: SongType[]
  /** 当前播放列表的信息 */
  private _playlistSource: { type: string; id: number }
  /** 当前播放歌曲的详细信息 */
  private _currentTrack: SongType
  /** 当这个list不为空时，会优先播放这个list的歌 */
  private _playNextList: SongType[]
  _isPersonalFM: boolean // 是否是私人FM模式
  _personalFMTrack: { id: number } // 私人FM当前歌曲
  _personalFMNextTrack: { id: number } // 私人FM下一首歌曲信息（为了快速加载下一首）
  constructor() {
    this._howler = null
    // 播放器状态
    this._playing = false // 是否正在播放中
    this._progress = 0 // 当前播放歌曲的进度
    this._enabled = false // 是否启用Player
    this._playMode = 0
    this._volume = 0.7
    this._volumeBeforeMuted = 1 // 用于保存静音前的音量
    this._personalFMLoading = false // 是否正在私人FM中加载新的track
    this._personalFMNextLoading = false // 是否正在缓存私人FM的下一首歌曲

    // 播放信息
    // @ts-expect-error
    this._currentTrack = { id: 412902095 } // 当前播放歌曲的详细信息

    this._list = [] // 当前播放列表
    this._playlistSource = { type: 'playlist', id: 123 } // 当前播放列表的信息
    this._playNextList = [] // 当这个list不为空时，会优先播放这个list的歌
    this._isPersonalFM = false // 是否是私人FM模式
    this._personalFMTrack = { id: 0 } // 私人FM当前歌曲
    this._personalFMNextTrack = { id: 0 } // 私人FM下一首歌曲信息（为了快速加载下一首）

    // init
    this._init()
  }

  /**
   * @description 播放模式
   * - 0-列表播放 1-列表循环 2-随机播放 3-单曲循环 4-心动模式
   */
  get playMode(): number {
    return this._playMode
  }

  set playMode(mode) {
    if (this._isPersonalFM) return
    if (![0, 1, 2, 3, 4].includes(mode)) {
      console.warn("repeatMode: invalid args, must be 'on' | 'off' | 'one'")
      return
    }
    this._playMode = mode
  }

  /**
   * @description 音量
   * - 范围区间 [0, 1]
   */
  get volume(): number {
    return this._volume
  }

  set volume(volume: number) {
    this._volume = volume
    Howler.volume(volume)
  }

  /**
   * @description 播放状态
   */
  get playing(): boolean {
    return this._playing
  }

  /**
   * @description 播放进度
   */
  get progress(): number {
    // return this._progress
    return this._howler?.seek() ?? 0
  }

  set progress(value: number) {
    if (this._howler !== null) {
      this._howler.seek(value)
    }
  }

  /**
   * @description 当前播放列表信息
   */
  get playlistSource(): { type: string; id: number } {
    return this._playlistSource
  }

  // seek(time = null): number {
  //   if (time !== null) {
  //     this._howler?.seek(time)
  //     if (this._playing) this._playDiscordPresence(this._currentTrack, this.seek())
  //   }
  //   return this._howler === null ? 0 : this._howler.seek()
  // }

  /**
   * @description 播放列表
   */
  get playNextList(): SongType[] {
    switch (this._playMode) {
      case 0:
        return this._playNextList
      case 2:
        return this.shuffledList
      default:
        return this._playNextList
    }
  }

  /**
   * @description 随机播放歌曲列表
   * - 被随机打乱的播放列表，随机播放模式下会使用此播放列表
   */
  get shuffledList(): SongType[] {
    return _.shuffle(this._list)
  }

  /**
   * @description 当前播放歌曲的index
   */
  get current(): number {
    // todo 返回当前index
    return this._list.findIndex((ele) => ele.id === this.currentTrackID)
  }

  /** 当前歌曲详细信息 */
  get currentTrack(): SongType {
    return this._currentTrack
  }

  /** 当前歌曲id */
  get currentTrackID(): number {
    return this._currentTrack?.id ?? 0
  }

  // 当前歌曲播放时长
  get currentTrackDuration(): number {
    const trackDuration = this._currentTrack.dt ?? 1000
    const duration = Math.floor(trackDuration / 1000)
    return duration > 1 ? duration - 1 : duration
  }

  /**
   * @description init
   */
  private _init(): void {
    Howler.volume(this.volume)

    this._loadSelfFromLocalStorage()

    void this._replaceCurrentTrack(this._currentTrack.id)

    // this._setIntervals()
  }

  _setIntervals(): void {
    // 同步播放进度
    // TODO: 如果 _progress 在别的地方被改变了，
    // 这个定时器会覆盖之前改变的值，是bug
    setInterval(() => {
      if (this._howler === null) return
      console.log('howler', this._howler.seek())
      this._progress = this._howler.seek()
    }, 1000)
  }

  /**
   * @description 暂停
   */
  pause(): void {
    if (!this._playing) return
    this._howler?.pause()
    this._playing = false
  }

  /**
   * @description 播放
   */
  play(): void {
    const playing = this._howler?.playing()
    if (playing !== undefined && playing) return
    this._howler?.play()
    this._playing = true
  }

  /**
   * @description 静音
   */
  mute(): void {}

  /**
   * @description 切换播放状态
   */
  togglePlayStatus(): void {
    if (this._playing) this.pause()
    else this.play()
  }

  /**
   * @description 加载缓存
   * @returns
   */
  private _loadSelfFromLocalStorage(): void {
    const player = JSON.parse(localStorage.getItem('player') as string)
    if (player === undefined) return
    console.log('_loadSelfFromLocalStorage')
    // for (const [key, value] of Object.entries(player)) {
    //   this[key] = value
    // }
  }

  /**
   * @description 清除播放列表
   */
  clearPlayNextList(): void {
    this._playNextList = []
  }

  /**
   * @description 缓存下一首歌
   */
  private _cacheNextTrack(): void {}

  /**
   * @description 下一首歌曲回调
   */
  private _nextTrackCallback(): void {
    console.log('next callback')
    // 单曲循环
    if (this.playMode === 3) {
      void this._replaceCurrentTrack(this.currentTrack.id)
    } else this._playNextTrack()
  }

  /**
   * @description 播放下一首歌曲
   */
  private _playNextTrack(): void {
    const [TrackId] = this._getNextTrack()

    if (TrackId !== -1) void this._replaceCurrentTrack(TrackId)
  }

  /**
   * @description 播放下一首
   */
  playNextTrack(): void {
    this._playNextTrack()
  }

  /**
   * @description 获取下一首歌曲的信息
   * @returns [下一首歌曲id]
   */
  private _getNextTrack(): [number] {
    let TrackId = -1

    if (this.current === -1) return [TrackId]

    // 正常下一首歌曲
    if (this.playNextList.length > this.current) {
      TrackId = this.playNextList[this.current + 1].id
    }

    return [TrackId]
  }

  /**
   * @description 播放上一首歌曲
   * @inner
   */
  private _playPrevTrack(): void {
    // 单曲循环
    if (this.playMode === 3) {
      void this._replaceCurrentTrack(this.currentTrack.id)
    } else {
      const [TrackId] = this._getPrevTrack()
      if (TrackId !== null) void this._replaceCurrentTrack(TrackId)
    }
  }

  /**
   * @description 播放上一首歌曲
   */
  playPrevTrack(): void {
    this._playPrevTrack()
  }

  /**
   * @description 获取上一首歌曲
   * @inner
   * @returns {[number,number]} [歌曲id, 上一首歌曲位置]
   */
  private _getPrevTrack(): [number, number] {
    const next = this.current - 1

    return [this.playNextList[next].id, next]
  }

  /**
   * @description 更换播放列表
   * @param type 播放列表类型
   * @param id id
   */
  async replacePlaylist(type: string, id: number): Promise<void> {
    if (id === this._playlistSource.id) return // 同一歌单/专辑不重复获取
    if (type === 'playlist') await this.getPlaylistById(id)
    if (type === 'album') await this.getAlbumListById(id)
    this._playlistSource = { type, id }
    this._playNextList = this._list
    console.log('replacePlaylist')
    console.log(this._list, this._playNextList)
  }

  /**
   * @description 获取对应id专辑歌曲
   * @param id
   */
  async getPlaylistById(id: number): Promise<void> {
    const {
      data: { songs },
    } = await getPlaylistAll({ id })

    this._list = songs
  }

  /**
   * @description 获取专辑歌曲
   * @param id
   */
  async getAlbumListById(id: number): Promise<void> {
    const {
      data: { songs },
    } = await albumInfo(id)

    console.log(songs)

    this._list = songs
  }

  /**
   * @description 播放对应来源歌曲
   * @param source 歌曲源
   * @param autoplay 自动播放
   */
  private _playAudioSource(source: string, autoplay = true): void {
    Howler.unload()
    this._howler = new Howl({
      src: [source],
      html5: true,
      preload: true,
      format: ['mp3', 'flac'],
      onend: () => {
        this._nextTrackCallback()
      },
    })
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaError/code
    // code 3: MEDIA_ERR_DECODE
    this._howler.on('loaderror', (_, errCode) => {
      if (errCode === 3) this._playNextTrack()
      else {
        const t = this.progress
        void this._replaceCurrentTrackAudio(this._currentTrack, false, false).then((replaced) => {
          // 如果 replaced 为 false，代表当前的 track 已经不是这里想要替换的track
          // 此时则不修改当前的歌曲进度
          if (replaced) {
            this._howler?.seek(t)
            this.play()
          }
        })
      }
    })

    // autoplay
    if (autoplay) {
      this.play()
      // todo
    }
  }

  /**
   * @description 替换当前歌曲
   * @inner
   * @param id
   * @param autoplay
   * @param ifUnplayableThen
   */
  private async _replaceCurrentTrack(
    id: number,
    autoplay = true,
    ifUnplayableThen = UNPLAYABLE_CONDITION.PLAY_NEXT_TRACK
  ): Promise<void> {
    // todo 获取歌曲详情
    const { data } = await SongDetail({ ids: id })
    const track = data.songs[0]
    this._currentTrack = track
    events.publish('track', this.currentTrackID)

    await this._replaceCurrentTrackAudio(track, autoplay, true, ifUnplayableThen)
  }

  /**
   * @description 替换当前歌曲
   * @param id
   * @param autoplay
   * @param ifUnplayableThen
   */
  public async replaceCurrentTrack(
    id: number,
    autoplay = true,
    ifUnplayableThen = UNPLAYABLE_CONDITION.PLAY_NEXT_TRACK
  ): Promise<void> {
    await this._replaceCurrentTrack(id, autoplay, ifUnplayableThen)
  }

  /**
   * @description 是否成功加载音频，并使用加载完成的音频替换了howler实例
   * @param track 歌曲详细信息
   * @param autoplay 自动播放
   * @param isCacheNextTrack 是否缓存下一首歌
   * @param ifUnplayableThen  Partial 当前歌曲不可播放时，后续操作
   * @returns replaced 是否已经替换
   */
  private async _replaceCurrentTrackAudio(
    track: SongType,
    autoplay: boolean,
    isCacheNextTrack: boolean,
    ifUnplayableThen = UNPLAYABLE_CONDITION.PLAY_NEXT_TRACK
  ): Promise<boolean> {
    return await this._getAudioSource(track).then((source) => {
      if (source !== null) {
        let replaced = false
        if (track.id === this.currentTrackID) {
          this._playAudioSource(source, autoplay)
          replaced = true
        }
        if (isCacheNextTrack) this._cacheNextTrack()

        return replaced
      } else {
        switch (ifUnplayableThen) {
          case UNPLAYABLE_CONDITION.PLAY_NEXT_TRACK:
            this._playNextTrack()
            break
          case UNPLAYABLE_CONDITION.PLAY_PREV_TRACK:
            this._playPrevTrack()
            break
          default:
            // todo dispatch Unplayable cond
            break
        }
        return false
      }
    })
  }

  /**
   * @description 获取audio播放源
   */
  private async _getAudioSource(track: SongType): Promise<string | null> {
    // neteasecloud
    const {
      data: { data },
    } = await SongUrl({ id: track.id })
    return data[0].url
  }
}

/**
 * 根据playMode的不同切换不同的playNextList
 */

export default Player
