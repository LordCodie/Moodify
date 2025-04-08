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
    "popularity"
]

function RouteComponent() {
    const navigate = useNavigate()

    const [step, setStep] = useState(0)

    const [genre, setGenre] = useState()
    const [acousticness, setAcousticness] = useState()
    const [danceability, setDanceability] = useState()
    const [energy, setEnergy] = useState()
    const [instrumentalness, setInstrumentalness] = useState()
    const [emotion, setEmotion] = useState()
    const [popularity, setPopularity] = useState()

    const handleNext = () => {
        if (step < categoryStateArray.length - 1) {
            setStep(prevStep => prevStep + 1)
        }
    }

    const handleSubmit = async () => {
        console.log('submission button clicked')
        navigate({ to: '/dashboard' })

        // localStorage.setItem('userSelections', JSON.stringify({
        //     genre: genre,
        //     acousticness: acousticness,
        //     danceability: danceability,
        //     energy: energy,
        //     instrumentalness: instrumentalness,
        //     emotion: emotion,
        //     popularity: popularity
        // }))

        // const data = await fetch('')
        // const response = await data.json()
    }

    // console.log("current category state:", categoryStateArray[step])
    console.log("current selections:", {
        genre: genre,
        acousticness: acousticness,
        danceability: danceability,
        energy: energy,
        instrumentalness: instrumentalness,
        emotion: emotion,
        popularity: popularity
    })

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
