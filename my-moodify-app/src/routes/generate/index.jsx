import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import GenreComponent from './-Genre'

export const Route = createFileRoute('/generate/')({
    component: RouteComponent,
})

const categoryStateArray = [
    "genre",
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "emotion",
    "popularity",
    "valence"
]

function RouteComponent() {
    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < categoryStateArray.length - 1){
            setStep(prevStep => prevStep + 1)
        }
    }

    console.log("current category state:", categoryStateArray[step])

    return (
        <div className='min-h-screen'>
            {step === 0 && <GenreComponent handleNext={handleNext} />}
        </div>
    )
}
