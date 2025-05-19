import { createFileRoute, Link, useNavigate, redirect } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from "@/components/ui/button"
import { DashboardCard } from "@/routes/dashboard/-dashboardCard"
import { Disc3, ListMusic } from "lucide-react"

export const Route = createFileRoute('/dashboard/')({
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
    <div className="flex justify-center items-center p-8 min-h-screen">
      <div className='md:flex gap-4 sm:row'>

        <DashboardCard
          logo={
            <Disc3
              size={100}
              color='#f8fafc'
              className='border-2 p-1 rounded-full border-white bg-linear-to-t from-stone-700 to-stone-950'
            />
          }
          title={"Start Moodifying"}
          link={"/generate"}
          description={"Search for music and create a playlist"}
        />

        <DashboardCard
          logo={
            <ListMusic
              size={100}
              className='border-2 py-1 rounded-full border-white bg-linear-to-t from-stone-700 to-stone-950'
            />
          }
          title={"Saved Playlists"}
          link={"/saved-playlists"}
          description={"Your previously generated playlist songs"}
        />

        {/* <Button className="bg-black text-white mr-4 text-lg p-6">
          <Link to="/generate">Start Moodifying</Link>
        </Button>
        <Button className="bg-black text-white text-lg p-6">
          <Link to="/saved-playlists">Saved Playlists</Link>
        </Button> */}

      </div>
    </div>
  )
}
