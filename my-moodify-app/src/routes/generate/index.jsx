import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

import GenreComponent from './-genre'
import AcousticnessComponent from './-acousticness'
import DanceabilityComponent from './-danceability'
import EnergyComponent from './-energy'
import InstrumentalnessComponent from './-instrumentalness'
import EmotionComponent from './-emotion'
import PopularityComponent from './-popularity'

const categoryStateArray = [
    "genre",
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "emotion",
    "popularity"
]

export const Route = createFileRoute('/generate/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    const [step, setStep] = useState(0)

    const handleNext = () => {
        if (step < categoryStateArray.length - 1) {
            setStep(prevStep => prevStep + 1)
        }
    }

    const handleSubmit = async () => {
        console.log('submission button clicked')
        navigate({ to: '/recommendations' })

        // localStorage.setItem('userSelections', JSON.stringify({
        //     genre: genre,
        //     acousticness: acousticness,
        //     danceability: danceability,
        //     energy: energy,
        //     instrumentalness: instrumentalness,
        //     emotion: emotion,
        //     popularity: popularity
        // }))
    }

    // console.log("current category state:", categoryStateArray[step])

    return (
        <div className='min-h-screen'>

            <div className='flex justify-end items-end p-4'>
                <Button className='text-white bg-black'>
                    <Link to='/dashboard'>Back home</Link>
                </Button>
            </div>

            {step === 0 && <GenreComponent handleNext={handleNext} handleGenre={setGenre} />}
            {step === 1 && <AcousticnessComponent handleNext={handleNext} handleAcousticness={setAcousticness} />}
            {step === 2 && <DanceabilityComponent handleNext={handleNext} handleDanceability={setDanceability} />}
            {step === 3 && <EnergyComponent handleNext={handleNext} handleEnergy={setEnergy} />}
            {step === 4 && <InstrumentalnessComponent handleNext={handleNext}
                handleInstrumentalness={setInstrumentalness} />}
            {step === 5 && <EmotionComponent handleNext={handleNext} handleEmotion={setEmotion} />}
            {step === 6 && <PopularityComponent handleNext={handleSubmit} handlePopularity={setPopularity} />}

        </div>
    )
}
