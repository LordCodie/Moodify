import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteplaylist } from "@/utilities/firebase/firebase-client"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "@tanstack/react-router"

export default function DeletePlaylistPopover({ playlistName }) {
    const { currentUser } = useAuth()
    const uid = currentUser?.uid

    console.log({
        uid, playlistName
    })

    const navigate = useNavigate()

    const deleteAction = async () => {
        console.log("delete playlist button pressed")
        const { success, message } = await deleteplaylist(uid, playlistName)
        if (success) {
            console.log(message)
            navigate({ to: '/saved-playlists' })
        }
    }

    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button
                    className='text-white bg-black hover:text-[#000000] hover:bg-[#44AF69]'>
                    Delete Playlist
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">

                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        playlist from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:text-[#FFFFFF] hover:bg-[#000000]">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="text-white bg-black hover:text-[#000000] hover:bg-[#FFFFFF]"
                        onClick={deleteAction}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}