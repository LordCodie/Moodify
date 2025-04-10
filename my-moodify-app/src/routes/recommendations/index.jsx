import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

import SongsBlock from './-songsBlock'

export const Route = createFileRoute('/recommendations/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='min-h-screen'>
            <SongsBlock />
        </div>
    )
}
