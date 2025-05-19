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
import SongsTable from "@/routes/recommendations/-songs-table"
import SavePlaylistPopover from "@/routes/recommendations/-saveplaylist-popover"
import { useSongs } from "@/context/SongsContext"
import { useAuth } from '@/context/AuthContext'

export default function SongsBlock() {
    const { currentUser } = useAuth()

      const { songs } = useSongs()
      const songsData = songs?.length === 0 ? null : songs?.slice(0, 50)
      console.log("songs:", songsData ? true : false)

    return (
        <div className="p-4 sm:p-6 md:p-12">
            <Card className="bg-white mt-10 w-full max-w-full md:max-w-4xl mx-auto">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Your Song Recommendations</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center items-center">
                        <div className="md:min-w-xl max-w-sm">
                            <SongsTable songsData={songsData} />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-center items-center">
                        <SavePlaylistPopover currentUser={currentUser} songsData={songsData}/>
                        <Button className='text-white bg-black hover:text-[#000000] hover:bg-[#44AF69]'>
                            <Link to='/dashboard'>Back home</Link>
                        </Button>
                    </div>
                </CardFooter>

            </Card>
        </div>
    )
}