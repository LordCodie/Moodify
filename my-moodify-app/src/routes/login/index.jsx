import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LoginForm } from "@/routes/login/-login-form"

export const Route = createFileRoute('/login/')({
  beforeLoad: ({ context, location }) => {
        if (context?.currentUser){
          throw redirect({
            to: '/dashboard',
            search: { redirect: location.href }
          })
        }
      },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
