import { ReactElement } from 'react'

export interface IRouteMeta {
  title: string
  icon?: string
}

export interface RouteType {
  // 路由路径
  path: string
  // 路由组件
  element: ReactElement
  // 嵌套路由
  children?: RouteProps[]
  // 路由信息
  meta?: IRouteMeta
  // 是否鉴权
  auth?: boolean
}
