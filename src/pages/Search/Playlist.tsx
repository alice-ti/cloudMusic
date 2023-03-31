import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Playlist from '@/features/PlayList'
import type { ToplistType } from '@/type/api'

interface PlaylistProps {
  list: ToplistType[]
}

const SearchPlaylist: FC<PlaylistProps> = ({ list }) => {
  const navigate = useNavigate()
  return (
    <>
      <Playlist list={list} playDetail={(id) => navigate(`/playlist/${id}`)} />
    </>
  )
}

export default SearchPlaylist
