import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonPlay from '@/components/ButtonPlay'
import Img from '@/components/Img'
import type { ArtistType } from '@/type/common'

interface ArtistPropType {
  info: ArtistType
}
const Artist: React.FC<ArtistPropType> = (props: ArtistPropType) => {
  const { info } = props
  const [showBtn, setShowBtn] = useState<boolean>(false)
  const navigate = useNavigate()
  const goArtist = (id: number): void => {
    navigate(`/singer/${id}`)
  }

  const handleEnter = (): void => setShowBtn(true)
  const handleLeave = (): void => setShowBtn(false)

  return (
    <>
      <div className="text-center">
        <div
          className="w-40 aspect-square relative text-stone-200"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={() => goArtist(info.id)}
        >
          <Img className="w-full h-full rounded-full select-none" src={info?.picUrl ?? ''} />
          {showBtn && (
            <ButtonPlay className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          )}
        </div>
        <div className="mt-4 cursor-pointer hover:underline">{info.name}</div>
      </div>
    </>
  )
}

export default Artist
