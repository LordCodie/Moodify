import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from "@tanstack/react-router"
import { Music2 } from "lucide-react"
import { nanoid } from "nanoid"
import { fetchUserPlaylistsTitles } from "@/utilities/firebase/firebase-client"
import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

export default function PlaylistsTable() {
    const { currentUser } = useAuth()
    const uid = currentUser?.uid

    const [titlesData, setTitlesData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    console.log("titlesData:", titlesData)

    useEffect(() => {
        if (!uid) return 

        const load = async () => {
            setLoading(true)

            const { success, data, message } = await fetchUserPlaylistsTitles(uid)
            if (!success) {
                setError(message)
            } else {
                setTitlesData(data)
                console.log("fetchUserPlaylistsTitles:", message)
            }
            setLoading(false)
        }

        load()
    }, [uid])

    const mockSavedPlaylists = Array.from({ length: 50 }).map((_, i) => ({
        id: nanoid(),
        name: `Playlist #${i + 1}`
    }))

    return (
        <div className="flex justify-center items-center rounded-xl p-1 overflow-x-auto">
            <Table>
                <TableBody className="max-h-[300px] w-full block overflow-y-auto">

                    {titlesData &&
                        titlesData?.map(playlist => (
                            <Link to="/view-playlist" search={{ name: playlist }}>
                                <TableRow key={playlist.id} className="border-0 hover:bg-[#F42C04] flex w-full">

                                    {/* <TableCell className="p-8 w-20 bg-gray-100">
                                        <Music2 />
                                    </TableCell> */}

                                    <TableCell className="p-8 align-middle">
                                        <h3 className="font-semibold">{playlist}</h3>
                                    </TableCell>

                                </TableRow>
                            </Link>))
                    }
                    {!titlesData && <div>You Currently Don't Have Any Playlists</div>}
                    {loading && <div>Loading Your Saved Playlists</div>}
                    {error && <div>{error}</div>}
                </TableBody>
            </Table>
        </div>
    )
}