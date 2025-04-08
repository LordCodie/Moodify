import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import GenreComponent from './-genre'
import AcousticnessComponent from './-acousticness'
import DanceabilityComponent from './-danceability'
import EnergyComponent from './-energy'
import InstrumentalnessComponent from './-instrumentalness'
import EmotionComponent from './-emotion'

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
            {step === 1 && <AcousticnessComponent handleNext={handleNext}/>}
            {step === 2 && <DanceabilityComponent handleNext={handleNext}/>}
            {step === 3 && <EnergyComponent handleNext={handleNext}/>}
            {step === 4 && <InstrumentalnessComponent handleNext={handleNext}/>}
            {step === 5 && <EmotionComponent handleNext={handleNext}/>}
        </div>
    )
}
