import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Navbar from '../components/navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="bg-linear-65 from-[#F4AC45] to-[#F42C04] min-h-screen">
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  ),
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    )
  }
})