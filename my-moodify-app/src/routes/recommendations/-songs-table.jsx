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

const mockSongsData = [
    {
        id: 1,
        artist: "Drake",
        song: 'Nokia',
        coverImage: "https://i.scdn.co/image/ab67616d00004851cc392813bfd8f63d4d5f4a95",
        album: "$ome $exy $ongs 4 U",
    },
    {
        id: 2,
        artist: "Kendrick Lamar",
        song: 'tv off',
        coverImage: "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58",
        album: "GNX",
    },
    {
        id: 3,
        artist: "J.Cole",
        song: 'cLOUDs',
        coverImage: "https://i.scdn.co/image/ab67616d000048519eda579e1df4f82bb796a9d1",
        album: "GNX",
    },
    {
        id: 4,
        artist: "Drake",
        song: 'Nokia',
        coverImage: "https://i.scdn.co/image/ab67616d00004851cc392813bfd8f63d4d5f4a95",
        album: "$ome $exy $ongs 4 U",
    },
    {
        id: 5,
        artist: "Kendrick Lamar",
        song: 'tv off',
        coverImage: "https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58",
        album: "GNX",
    },
    {
        id: 6,
        artist: "J.Cole",
        song: 'cLOUDs',
        coverImage: "https://i.scdn.co/image/ab67616d000048519eda579e1df4f82bb796a9d1",
        album: "GNX",
    }
]

export default function SongsTable({ songsData }) {
    return (
        <div className="flex justify-center items-center rounded-xl p-1 overflow-x-auto">
            <Table>

                <TableHeader></TableHeader>

                {/* max-h-[300px] w-full block overflow-y-auto */}
                <TableBody className="max-h-[350px] w-full block overflow-y-auto">
                    {songsData?.map(({ album, artist, id, image, name, url }) => (

                        <TableRow
                            key={id}
                            className="border-0 hover:bg-[#F42C04] flex w-full"
                            asChild
                        >
                            <Link
                                to={url}
                                target="_blank"
                                rel="noopener noreferrer">

                                <>
                                    <TableCell className="p-2 w-20">
                                        <img
                                            src={image}
                                            alt={`${name} cover image by ${artist}`}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <h3 className="font-semibold">{name}</h3>
                                        </div>
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <p className="text-sm text-gray-500">{artist}</p>
                                        </div>
                                    </TableCell>

                                    <TableCell className="p-2 align-middle">
                                        <div>
                                            <p className="text-sm text-gray-400">{album}</p>
                                        </div>
                                    </TableCell>
                                </>

                            </Link>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}