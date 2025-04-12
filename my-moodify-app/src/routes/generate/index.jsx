import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useUserSelections } from '@/context/userSelectionsContext'
import InputComponent from './-input-component'

export const Route = createFileRoute('/generate/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const { feeling, setFeeling } = useUserSelections()

    const handleSubmit = async () => {
        console.log('submission button clicked')
        navigate({ to: '/recommendations' })
    }

    return (
        <div className='min-h-screen'>

            <div className='flex justify-end items-end p-4'>
                <Button className='text-white bg-black'>
                    <Link to='/dashboard'>Back home</Link>
                </Button>
            </div>

            <InputComponent
                feeling={feeling}
                handleFeeling={(e) => setFeeling(e.target.value)}
                handleNext={handleSubmit}
            />
        </div>
    )
}
