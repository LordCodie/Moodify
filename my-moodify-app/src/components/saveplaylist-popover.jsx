import React, { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

export default function SavePlaylistPopover() {
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
                    <Button className="text-white bg-black mr-4 rounded-lg" variant="outline">Add Playlist</Button>
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
                            Name Playlist
                        </Button>
                    </DialogFooter>

                </DialogContent>

            </Dialog>
        </div>
    )
}