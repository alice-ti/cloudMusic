import { useEffect, useState } from 'react'

import Artist from '@/components/Artist'
import { singerHot } from '@/service/singer'
import type { ArtistType } from '@/type/common'

const RecomArtist: React.FC = (props) => {
  const [artistList, setArtistList] = useState<ArtistType[]>([])
  useEffect(() => {
    const getHotArtist = async (): Promise<void> => {
      const { data } = await singerHot({})
      const { artists } = data
      setArtistList(artists)
    }
    void getHotArtist()
  }, [])
  return (
    <section className="my-10 grid grid-cols-6 grid-rows-2 gap-y-8 justify-items-center">
      {artistList?.slice(0, 12).map((ele, idx) => (
        <Artist info={ele} key={idx} />
      ))}
    </section>
  )
}

export default RecomArtist
