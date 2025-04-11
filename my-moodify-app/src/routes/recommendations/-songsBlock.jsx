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
import SavePlaylistPopover from "@/components/saveplaylist-popover"

export default function SongsBlock() {
    return (
        <div className="p-4 sm:p-6 md:p-12">
            <Card className="bg-white mt-10 w-full max-w-full md:max-w-4xl mx-auto">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Your Song Recommendations</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center items-center flex-wrap">
                        <div className="md:min-w-xl px-6 min-w-sm">
                            <SongsTable />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-center items-center">
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