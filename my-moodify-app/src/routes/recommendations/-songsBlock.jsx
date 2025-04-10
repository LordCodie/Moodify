import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Link } from "@tanstack/react-router"
import SongsTable from "@/components/songs-table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"

function SavePlaylistPopover() {
    const [playlistName, setPlaylistName] = useState("")

    // this where you'll save your playlists and assign it a name
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(`Saving playlist name: ${playlistName}`)
    }

    return (
        <div>
            <Dialog>

                <DialogTrigger asChild>
                    <Button className="text-white bg-black mr-4 rounded-lg" variant="outline">Open</Button>
                </DialogTrigger>

                <DialogContent className="bg-white sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle className="text-center">Create Your Playlist</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <Input
                                id="playlist-name"
                                type="text"
                                name="playlist-name"
                                value={playlistName}
                                className="col-span-3"
                                placeholder="Enter the playlist name"
                                onChange={(event) => setPlaylistName(event.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className='text-white bg-black mr-4'>
                            Save Playlist
                        </Button>
                    </DialogFooter>

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default function SongsBlock() {
    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Your Song Recommendations</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>
                    <div className="md:flex justify-center items-center flex-wrap">
                        <div className="w-full px-6">
                            <SongsTable />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-center items-center">
                        {/* <Button className='text-white bg-black mr-4'>Save Playlist</Button> */}
                        <SavePlaylistPopover />
                        <Button className='text-white bg-black'>
                            <Link to='/dashboard'>Back home</Link>
                        </Button>
                    </div>
                </CardFooter>

            </Card>
        </div>
    )
}