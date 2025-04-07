import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function GenreComponent({ handleNext }) {

    const genres = ["Hip-Hop", "R&B", "House", "Pop"]

    const [selected, setSelected] = useState("")

    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Pick Your Favourite Genre</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        {genres.map((genre) => (
                            <div
                                key={genre}
                                onClick={() => setSelected(genre)}
                                className={cn(
                                    "cursor-pointer text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 transition-colors duration-300",
                                    selected === genre ? "bg-[#F4AC45]" : "bg-[#F42C04] hover:bg-[#F4AC45]"
                                )}
                            >
                                {genre}
                            </div>
                        ))}

                        {/* <div className="text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 bg-[#F42C04] hover:bg-[#F4AC45]">
                            Hip-Hop
                        </div>
                        <div className="text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 bg-[#F42C04] hover:bg-[#F4AC45]">
                            R&B
                        </div>
                        <div className="text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 bg-[#F42C04] hover:bg-[#F4AC45]">
                            House
                        </div>
                        <div className="text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 bg-[#F42C04] hover:bg-[#F4AC45]">
                            Pop
                        </div> */}
                    </div>

                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-end items-end">
                        <Button className="bg-[#F4AC45] hover:bg-[#F42C04]" onClick={handleNext}>Next</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}