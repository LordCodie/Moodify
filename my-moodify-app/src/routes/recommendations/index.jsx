import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recommendations/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='min-h-screen'>
            Your recommendations will load here!
        </div>
    )
}
