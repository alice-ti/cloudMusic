import { FC, Reducer, useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'

import { cloudsearch, TypeOfSearch } from '@/service/search'
import type { ToplistType } from '@/type/api'
import type { AlbumType, ArtistType, SongType } from '@/type/common'

import SearchAlbum from './Album'
import SearchPlaylist from './Playlist'
import SearchSinger from './Singer'
import SearchTrack from './Track'

const SearchTypeList: Array<{ name: string; id: TypeOfSearch }> = [
  {
    name: '单曲',
    id: 1,
  },
  {
    name: '专辑',
    id: 10,
  },
  {
    name: '歌手',
    id: 100,
  },
  {
    name: '歌单',
    id: 1000,
  },
]

// type TypeMap = SongType[] | AlbumType[] | ArtistType[] | ToplistType[]

// const ResultMap: { [name in TypeOfSearch]: (list: TypeMap) => JSX.Element } = {
// 1: (list: SongType[]) => <SearchTrack list={list} />,
// 10: (list: AlbumType[]) => <SearchAlbum list={list} />,
// 100: (list: ArtistType[]) => <SearchSinger list={list} />,
// 1000: (list: ToplistType[]) => <SearchPlaylist list={list} />,
// }

const renderSearchResults = <T extends any>(list: T[], type: TypeOfSearch): JSX.Element => {
  switch (type) {
    case TypeOfSearch.Song:
      return <SearchTrack list={list as SongType[]} />
    case TypeOfSearch.Album:
      return <SearchAlbum list={list as AlbumType[]} />
    case TypeOfSearch.Artist:
      return <SearchSinger list={list as ArtistType[]} />
    case TypeOfSearch.Playlist:
      return <SearchPlaylist list={list as ToplistType[]} />
  }
}
interface SearchResult {
  type: TypeOfSearch
  val: any[]
}

const reducerAction: Reducer<SearchResult, any> = (state, action) => {
  return action
}

const Search: FC = () => {
  const [params] = useSearchParams()
  const [result, dispatch] = useReducer(reducerAction, { type: 1, val: [] })

  useEffect(() => {
    const init = async (): Promise<void> => {
      await searchSong(1)
    }
    void init()
  }, [params.getAll('q')[0]])

  const searchSong = async (type: TypeOfSearch): Promise<void> => {
    const keywords = params.getAll('q')[0]
    const {
      data: { result },
    } = await cloudsearch({ keywords, type })
    const { songs, albums, artists, playlists } = result
    const searchResult = songs ?? albums ?? artists ?? playlists
    console.log(result)
    dispatch({ type, val: searchResult })
  }

  const handleChangeType = (type: TypeOfSearch): void => {
    void searchSong(type)
  }

  return (
    <>
      <main className="flex-1 flex flex-col overflow-y-auto box-border">
        <aside className="lg:px-20 box-border h-20 flex items-center">
          {SearchTypeList.map((ele, idx) => (
            <div
              className={
                `px-4 font-bold text-lg rounded-sm cursor-pointer text-slate-600 hover:bg-slate-300/50 ` +
                (result.type === ele.id
                  ? 'hover:bg-fuchsia-400/30 bg-fuchsia-200/50 text-fuchsia-700'
                  : '')
              }
              onClick={() => handleChangeType(ele.id)}
              key={idx}
            >
              {ele.name}
            </div>
          ))}
        </aside>
        <hr />
        <section className="lg:px-20 box-border flex flex-1 h-full flex-col overflow-y-auto">
          {/* {ResultMap[result.type](result.val)} */}
          {renderSearchResults(result.val, result.type)}
        </section>
      </main>
    </>
  )
}

export default Search
