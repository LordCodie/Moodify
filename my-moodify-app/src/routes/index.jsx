import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-8 min-h-screen">
      <h1 className='mt-36 text-5xl font-light text-center leading-16 text-shadow-md'>
        Welcome To <span className='font-bold text-[#F4AC45] underline underline-offset-[8px] decoration-dashed decoration-[#F42C04]'>Moodify</span>! <br /> Tell Us How You're Feeling, and we'll suggests some songs  for you to listen to!
      </h1>

      <div className='mt-26 flex justify-center gap-4 sm:row'>
        <Button className="bg-black text-white mr-4 text-lg p-6">
          <Link to="/sign-up">Get Started</Link>
        </Button>
        <Button className="bg-black text-white text-lg p-6">
          <Link to="/login">Log In</Link>
        </Button>
      </div>

    </div>
  )
}