import Img from '@components/Img'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/store'
import { getUserAccount } from '@/store/features/user'

const User: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const info = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const init = async (): Promise<void> => {
      await dispatch(getUserAccount())
    }
    void init()
  }, [])

  return (
    <>
      <Img
        className="mr-20 mt-3 float-right clear-both h-10 aspect-square rounded-md cursor-pointer"
        src={info?.avatarUrl ?? ''}
      />
    </>
  )
}

export default User
