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
import PlaylistsSongsTable from "./-playlist-songs-table"
import DeletePlaylistPopover from "./-deleteplaylist-popover"

export default function PlaylistSongsBlock({ title }) {
    return (
        <div className="p-4 sm:p-6 md:p-12">

            <div className='flex justify-end items-end p-4'>
                <Button className='text-white bg-black'>
                    <Link to='/dashboard'>Back home</Link>
                </Button>
            </div>

            <Card className="bg-white mt-10 w-full max-w-full md:max-w-4xl mx-auto">

                <CardHeader>
                    <CardTitle className="text-center text-xl">{title}</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center items-center">
                        <div className="md:min-w-full min-w-sm">
                            <PlaylistsSongsTable playlistName={title}/>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-center items-center">

                        {/* <Button className='text-white bg-black'>
                            Delete Playlist
                        </Button> */}

                        <DeletePlaylistPopover playlistName={title}/>
                    </div>
                </CardFooter>

            </Card>
        </div>
    )
}