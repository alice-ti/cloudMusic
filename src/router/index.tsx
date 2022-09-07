import { Suspense } from 'react'

import Route from './route'

const Router: React.FC = () => <Suspense>{Route()}</Suspense>

export default Router
