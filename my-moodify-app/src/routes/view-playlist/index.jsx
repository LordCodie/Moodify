import { createFileRoute, useSearch } from '@tanstack/react-router'

import PlaylistSongsBlock from './-playlist-songsBlock'

export const Route = createFileRoute('/view-playlist/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id, name } = useSearch({ strict: false })
    return (
        <div>
            <PlaylistSongsBlock title={name}/>
        </div>
    )
}
