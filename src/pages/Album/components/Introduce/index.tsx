import Img from '@components/Img'
import type { AlbumType } from '@type/api'

const Introduce: React.FC<AlbumType> = (props: AlbumType) => {
  const { picUrl, name, description } = props
  return (
    <section className="flex flex-row">
      <Img src={picUrl} className="w-60 rounded-md" />
      <div>
        <div>{name}</div>
        <div className="line-clamp-3">{description}</div>
      </div>
    </section>
  )
}

export default Introduce
