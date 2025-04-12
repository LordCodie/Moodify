import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

export default function SongsTable() {
    return (
        <div className="flex justify-center items-center rounded-xl p-1 overflow-x-auto">
            <Table>
                {/* <TableCaption>Playlist One</TableCaption> */}

                <TableHeader>
                    {/* <TableRow>
                        <TableHead >Cover Image</TableHead>
                        <TableHead>Song Info</TableHead>
                    </TableRow> */}
                </TableHeader>

                <TableBody className="max-h-[300px] w-full block overflow-y-auto">
                    {mockSongsData.map(track => (
                        <TableRow key={track.id} className="border-0 hover:bg-[#F42C04] flex w-full">

                            <TableCell className="p-2 w-20">
                                <img 
                                src={track.coverImage} 
                                alt={`${track.song} cover image by ${track.artist}`} 
                                className="w-12 h-12 rounded object-cover"
                                />
                            </TableCell>

                            <TableCell className="p-2 align-middle">
                                <div>
                                <h3 className="font-semibold">{track.song}</h3>
                                    <p className="text-sm text-gray-500">{track.artist}</p>
                                    <p className="text-sm text-gray-400">{track.album}</p>
                                </div>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
}