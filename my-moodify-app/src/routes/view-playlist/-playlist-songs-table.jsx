import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchUserPlaylistsSongs } from "@/utilities/firebase/firebase-client"
import React, { useState, useEffect } from 'react'
import { useAuth } from "@/context/AuthContext"
import { Link } from "@tanstack/react-router"

const mockSongsData = [
    {
        id: 1,
        artist: "Drake",
        song: 'Nokia',
        coverImage: "https://i.scdn.co/image/ab67616d00004851cc392813bfd8f63d4d5f4a95",
        album: "$ome $exy $ongs 4 U",
    },
    {
        id: 2,
        artist: "Kendrick Lamar",
        song: 'tv off',
        coverImage: "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58",
        album: "GNX",
    },
    {
        id: 3,
        artist: "J.Cole",
        song: 'cLOUDs',
        coverImage: "https://i.scdn.co/image/ab67616d000048519eda579e1df4f82bb796a9d1",
        album: "GNX",
    },
    {
        id: 4,
        artist: "Drake",
        song: 'Nokia',
        coverImage: "https://i.scdn.co/image/ab67616d00004851cc392813bfd8f63d4d5f4a95",
        album: "$ome $exy $ongs 4 U",
    },
    {
        id: 5,
        artist: "Kendrick Lamar",
        song: 'tv off',
        coverImage: "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58",
        album: "GNX",
    },
    {
        id: 6,
        artist: "J.Cole",
        song: 'cLOUDs',
        coverImage: "https://i.scdn.co/image/ab67616d000048519eda579e1df4f82bb796a9d1",
        album: "GNX",
    }
]

export default function PlaylistsSongsTable({ playlistName }) {
    const { currentUser } = useAuth()
    const uid = currentUser?.uid

    console.log("PlaylistsSongsTable Title:", playlistName)
    const [playlistSongs, setPlaylistSongs] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const load = async () => {
            const { success, data, message } = await fetchUserPlaylistsSongs(uid, playlistName)
            if (!success) {
                setError(message)
            } else {
                setPlaylistSongs(data?.songData)
                console.log("playlistSongs:", playlistSongs)
            }
        }
        load()
    }, [playlistName])


    return (
        <div className="rounded-xl p-1">
            <Table>
                <TableBody className="max-h-[300px] w-full block">
                    {!error ?
                        playlistSongs?.map(track => (
                            <TableRow
                                key={track.id}
                                className="border-0 hover:bg-[#F42C04]">

                                <Link
                                    to={track.url}
                                    target="_blank"
                                    rel="noopener noreferrer">

                                    <TableCell className="p-2 w-20">
                                        <img
                                            src={track.image}
                                            alt={`${track.name} cover image by ${track.artist}`}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <h3 className="font-semibold">{track.name}</h3>
                                        </div>
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <p className="text-sm text-gray-500">{track.artist}</p>
                                        </div>
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <p className="text-sm text-gray-400">{track.album}</p>
                                        </div>
                                    </TableCell>
                                </Link>

                            </TableRow>
                        ))
                        :
                        <div>Error loading error: {error}</div>
                    }
                </TableBody>
            </Table>
        </div>
    )
}