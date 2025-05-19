import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Navbar from '../components/navbar'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: 'Moodify - Song Suggestor App' },
      { name: 'description', content: `Tells Us Your Mood And We'll Suggest The Songs` }
    ],
    links: [{ rel: 'icon', href: '/moodify-transparent-background-small.png' }]
  }),
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    )
  },
  component: () => (
    <>
        <HeadContent />
        <Navbar />
          <div className="bg-linear-65 from-[#F4AC45] to-[#F42C04] min-h-screen">
            <Outlet />
            <TanStackRouterDevtools />
          </div>
    </>
  ),
})