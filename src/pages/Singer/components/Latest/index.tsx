import type { AlbumType, MvType } from '@type/api'

import Album from './Album'
import Mv from './Mv'

interface LatestPropsType {
  album: AlbumType
  mv: MvType
}
const Latest: React.FC<LatestPropsType> = (props: LatestPropsType) => {
  const { album, mv } = props
  return (
    <section className="my-10 grid grid-cols-2">
      <Album {...album} />
      <Mv {...mv} />
    </section>
  )
}

export default Latest
