import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '@/components/SvgIcon'

const History: React.FC = () => {
  const navigate = useNavigate()

  const handleHistory = (type: 0 | 1): void => {
    if (type === 0) navigate(-1)
    else if (type === 1) navigate(1)
  }

  return (
    <>
      <section className="h-full flex items-center">
        <Icon
          onClick={() => handleHistory(0)}
          name="arrow-left"
          className="w-8 aspect-square cursor-pointer rounded-md hover:bg-slate-200/50"
        />
        <Icon
          onClick={() => handleHistory(1)}
          name="arrow-right"
          className="w-8 aspect-square cursor-pointer rounded-md hover:bg-slate-300/50"
        />
      </section>
    </>
  )
}

export default memo(History)
