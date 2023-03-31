import type { RouteType } from '@type/route'
import React, { lazy } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import LayoutFooter from '@/features/LayoutFooter'
import LayoutHeader from '@/features/LayoutHeader'

const Home = lazy(async () => await import('@pages/Home'))
const Mine = lazy(async () => await import('@pages/Mine'))
const Find = lazy(async () => await import('@pages/Find'))
const Song = lazy(async () => await import('@pages/Song'))
const Album = lazy(async () => await import('@pages/Album'))
const Login = lazy(async () => await import('@pages/Login'))
const Search = lazy(async () => await import('@pages/Search'))
const Singer = lazy(async () => await import('@pages/Singer'))
const PlayList = lazy(async () => await import('@pages/PlayList'))

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
      { path: '/', element: <Navigate to="/index" /> },
      { path: '/index', element: <Home />, meta: { title: 'Index' } },
      { path: '/album/:id', element: <Album />, meta: { title: 'Album' } },
      { path: '/singer/:id', element: <Singer />, meta: { title: 'Singer' } },
      { path: '/playlist/:id', element: <PlayList />, meta: { title: 'SongSheet' } },
      { path: '/song', element: <Song />, meta: { title: 'Song' } },
      { path: '/login', element: <Login />, meta: { title: 'Login' } },
      { path: '/find', element: <Find />, meta: { title: 'Find' } },
      { path: '/search', element: <Search />, meta: { title: 'Search' } },
    ],
  },

  { path: '/mine', element: <Mine />, meta: { title: 'Mine' } },
]

const Route = (): React.ReactElement | null => useRoutes(routes)

export default Route
