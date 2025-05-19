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
import { saveplaylist } from "@/utilities/firebase/firebase-client"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from '@tanstack/react-router'

export default function SavePlaylistPopover({ currentUser, songsData }) {
    const navigate = useNavigate()

    const FieldInfo = ({ field }) => {
        return (
            <>
                {field.state.meta.isTouched && field.state.meta.isValid
                    ? <em>{field.state.meta.errors.join(',')}</em>
                    : null}
                {field.state.meta.isValidating ? 'Loading...' : null}
            </>
        )
    }

    const form = useForm({
        defaultValues: { playlistName: '' },
        onSubmit: async ({ value }) => {
            console.log('clicked')

            const playlistName = value.playlistName
            const uid = currentUser ? currentUser?.uid : null

            console.log(`Saving playlist name: ${playlistName}`)

            if (!currentUser || !songsData) return Error(`Can't create and name playlist: current user or songsData missing`)

            const { success, message } = await saveplaylist(uid, playlistName, songsData)
            if (!success) return Error(message)

            navigate({ to: '/saved-playlists' })

            console.log("savePlaylist:", message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return (
        <div>

            <Dialog>

                <DialogTrigger asChild>
                    <Button
                        className="text-white bg-black mr-4 rounded-lg hover:text-[#000000] hover:bg-[#44AF69]">
                        Add Playlist
                    </Button>
                </DialogTrigger>

                <DialogContent aria-describedby={''} className="bg-white sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>

                        <DialogHeader>
                            <DialogTitle className="text-center">Create Your Playlist</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <form.Field
                                name="playlistName"
                                validators={{
                                    onChange: ({ value }) => {
                                        if (!value) return 'Please insert a palylist name'
                                    },
                                    onChangeAsyncDebounceMs: 500
                                }}
                                children={field => (
                                    <>
                                        <div className="grid grid-cols-1 items-center gap-4">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onChange={e => field.handleChange(e.target.value)}
                                                type="text"
                                                className="col-span-3"
                                                placeholder="Enter playlist name"
                                                required
                                            />
                                        </div>
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <form.Subscribe
                                selector={state => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <>
                                        <Button
                                            type="submit"
                                            className='text-white bg-black mr-4 hover:text-[#000000] hover:bg-[#44AF69]'
                                            disabled={!canSubmit}>
                                            {isSubmitting ? "..." : "Name Playlist"}
                                        </Button>
                                    </>
                                )}
                            />
                        </DialogFooter>

                    </form>
                </DialogContent>

            </Dialog>

        </div>
    )
}