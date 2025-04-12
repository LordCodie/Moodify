import { createFileRoute } from '@tanstack/react-router'
import { GalleryVerticalEnd } from "lucide-react"
import { SignUpForm } from "@/routes/sign-up/-signup-form"


export const Route = createFileRoute('/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm/>
      </div>
    </div>
  )
}
