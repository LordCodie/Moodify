import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import GenreComponent from './-Genre'

export const Route = createFileRoute('/generate/')({
    component: RouteComponent,
})

function RouteComponent() {
    const categoryStateArray = ["genre", "acousticness", "danceability", "energy", "instrumentalness", "emtion", "popularity", "valence"]

    // const [categoryState, setcategoryState] = useEffect(0)

    // console.log("current category state:", categoryStateArray[categoryState])

    return (
        <div>
            <GenreComponent />
        </div>
    )
}
