import { useNavigate } from 'react-router-dom'

const Nav: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="w-fit flex items-center justify-center">
      <div
        className="px-3 py-1 font-bold rounded-md text-gray-700 hover:bg-gray-200/70 cursor-pointer"
        onClick={() => navigate('/find')}
      >
        发现
      </div>
    </section>
  )
}

export default Nav
