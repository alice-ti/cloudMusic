import React, { useEffect, useState } from 'react'

import Album from '@/components/Album'
import { getRecSongSheet } from '@/service/songSheet'

const RecomSongSheet: React.FC = () => {
  const [songList, setSongList] = useState<any[]>()
  useEffect(() => {
    const getList = async (): Promise<void> => {
      const {
        data: { result },
      } = await getRecSongSheet()
      console.log(result)
      setSongList(result)
    }
    void getList()
  }, [])
  return (
    <main className="grid grid-cols-5 gap-x-4 gap-y-1.5 px-8 box-border">
      {songList?.map((ele) => (
        <div className="my-1.5" key={ele.id}>
          <Album src={ele.picUrl} />
        </div>
      ))}
    </main>
  )
}

export default RecomSongSheet
