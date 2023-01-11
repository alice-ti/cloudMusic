import Img from '@components/Img'
import type { AlbumType } from '@type/api'

const Introduce: React.FC<AlbumType> = (props: AlbumType) => {
  const { picUrl, name, description } = props
  return (
    <section className="flex flex-row my-10">
      <Img src={picUrl} className="w-60 rounded-md select-none" />
      <div className="ml-10 mt-3">
        <div className="text-2xl font-bold">{name}</div>
        <div className="mt-6 line-clamp-3">{description}</div>
      </div>
    </section>
  )
}

export default Introduce
