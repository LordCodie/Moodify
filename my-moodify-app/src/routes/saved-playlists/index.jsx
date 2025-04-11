import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved-playlists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/saved-playlists/"!</div>
}
