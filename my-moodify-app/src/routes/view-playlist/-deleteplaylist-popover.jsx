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

export default function DeletePlaylistPopover() {
    return (
        <AlertDialog>

            <AlertDialogTrigger asChild>
                <Button className='text-white bg-black' variant="outline">Delete Playlist</Button>
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-white bg-black">Continue</AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    )
}