import { createFileRoute, redirect } from '@tanstack/react-router'
import SongsBlock from './-songsBlock'

export const Route = createFileRoute('/recommendations/')({
  beforeLoad: ({ context, location }) => {
    if (!context?.currentUser) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href }
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex justify-center items-center'>
      <SongsBlock/>
    </div>
  )
}
