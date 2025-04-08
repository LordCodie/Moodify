import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex justify-center items-center p-8 min-h-screen">
        <div className='flex gap-4 sm:row'>
                <Button className="bg-black text-white mr-4 text-lg p-6">
                  <Link to="/generate">Start Moodifying</Link>
                </Button>
                <Button className="bg-black text-white text-lg p-6">
                  <Link to="/">Saved Playlists</Link>
                </Button>
              </div>
    </div>
  )
}
