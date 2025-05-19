import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

import SavedPlaylistsBlock from './-saved-playlists-block'

export const Route = createFileRoute('/saved-playlists/')({
  beforeLoad: ({ context, location }) => {
    if (!context?.currentUser){
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
    <div>
      <SavedPlaylistsBlock />
    </div>
  )
}
