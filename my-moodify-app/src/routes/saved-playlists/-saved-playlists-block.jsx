import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { Link } from "@tanstack/react-router"
import PlaylistsTable from "./-playlists-table"

export default function SavedPlaylistsBlock() {
    return (
        <div className="p-4 sm:p-6 md:p-12">

            <div className='flex justify-end items-end p-4'>
                <Button className='text-white bg-black'>
                    <Link to='/dashboard'>Back home</Link>
                </Button>
            </div>

            <Card className="bg-white mt-10 w-full max-w-full md:max-w-4xl mx-auto">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Your Saved Playlists</CardTitle>
                </CardHeader>

                <CardContent>
                    <PlaylistsTable />
                </CardContent>

            </Card>
        </div>
    )
}