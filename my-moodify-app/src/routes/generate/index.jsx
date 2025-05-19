import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import InputComponent from './-input-component'

export const Route = createFileRoute('/generate/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='min-h-screen'>

            <div className='flex justify-end items-end p-4'>
                <Button className='text-white bg-black'>
                    <Link to='/dashboard'>Back home</Link>
                </Button>
            </div>

            <InputComponent/>
        </div>
    )
}
