import type { RouteType } from '@type/route'
import React, { lazy } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

import LayoutFooter from '@/features/LayoutFooter'
import LayoutHeader from '@/features/LayoutHeader'

const Home = lazy(async () => await import('@pages/Home'))
const Find = lazy(async () => await import('@pages/Find'))
const PlayList = lazy(async () => await import('@/pages/PlayList'))

const BaseLayout: React.FC = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <LayoutHeader />
        <Outlet />
        <LayoutFooter />
      </div>
    </>
  )
}

const routes: RouteType[] = [
  {
    path: '/',
    // element: <Navigate to="/index" />,
    element: <BaseLayout />,
    children: [
      { path: '/index', element: <Home />, meta: { title: 'Index' } },
      { path: '/playlist/:id', element: <PlayList />, meta: { title: 'SongSheet' } },
    ],
  },

  { path: '/find', element: <Find />, meta: { title: 'Find' } },
]

const Route = (): React.ReactElement | null => useRoutes(routes as any)

export default Route
