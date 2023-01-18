import Bg from './components/Bg'
import Lyric from './components/Lyric'

const SongDetail: React.FC = () => {
  return (
    <main className="flex-1 overflow-y-auto relative">
      <Bg />
      <section className="h-full overflow-y-auto">
        <Lyric />
      </section>
      {/* // TODO 收藏 喜欢 添加歌单 */}
      <section></section>
    </main>
  )
}

export default SongDetail
