import { createFileRoute, useSearch, useNavigate, redirect } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

import PlaylistSongsBlock from './-playlist-songsBlock'

export const Route = createFileRoute('/view-playlist/')({
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
    const { name } = useSearch({ strict: false })
    return (
        <div>
            <PlaylistSongsBlock title={name} />
        </div>
    )
}
