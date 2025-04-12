import { createFileRoute } from '@tanstack/react-router'

import SavedPlaylistsBlock from './-saved-playlists-block'

export const Route = createFileRoute('/saved-playlists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <SavedPlaylistsBlock />
    </div>
  )
}
