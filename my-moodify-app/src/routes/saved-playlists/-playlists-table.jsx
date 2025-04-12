import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from "@tanstack/react-router"
import { Music2 } from "lucide-react"
import { nanoid } from "nanoid"

export default function PlaylistsTable() {

    const mockSavedPlaylists = Array.from({ length: 50 }).map((_, i) => ({
        id: nanoid(),
        name: `Playlist #${i + 1}`
    }))

    return (
        <div className="flex justify-center items-center rounded-xl p-1 overflow-x-auto">
            <Table>
                
                <TableHeader></TableHeader>

                <TableBody className="max-h-[300px] w-full block overflow-y-auto">
                    {mockSavedPlaylists.map(playlist => (
                        <Link to="/view-playlist" search={{ id: playlist.id, name: playlist.name }}>
                            <TableRow key={playlist.id} className="border-0 hover:bg-[#F42C04] flex w-full">

                                <TableCell className="p-8 w-20 bg-gray-100">
                                    <Music2 />
                                </TableCell>

                                <TableCell className="p-8 align-middle">
                                    <h3 className="font-semibold">{playlist.name}</h3>
                                </TableCell>

                            </TableRow>
                        </Link>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}