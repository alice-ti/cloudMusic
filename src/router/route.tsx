import type { RouteType } from '@type/route'
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const Home = lazy(async () => await import('@pages/Home'))
const Find = lazy(async () => await import('@pages/Find'))
const PlayList = lazy(async () => await import('@/pages/PlayList'))

const routes: RouteType[] = [
  { path: '/', element: <Navigate to="/index" /> },
  { path: '/index', element: <Home />, meta: { title: 'Index' } },
  { path: '/find', element: <Find />, meta: { title: 'Find' } },
  { path: '/playlist/:id', element: <PlayList />, meta: { title: 'SongSheet' } },
]

const Route = (): React.ReactElement | null => useRoutes(routes as any)

export default Route
