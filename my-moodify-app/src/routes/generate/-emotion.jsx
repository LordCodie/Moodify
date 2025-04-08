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

export default function EmotionComponent({ handleNext, handleEmotion }) {

    const genres = [
        {
            label: "Sad",
            value: 0
        }, 
        {
            label: "Happy",
            value: 1
        }
    ]

    const [selected, setSelected] = useState("")

    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Sad or Happy ?</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        {genres.map((e) => (
                            <div
                                key={e.label}
                                onClick={() => {
                                    setSelected(e.value)
                                    handleEmotion(e.value)
                                }}
                                className={cn(
                                    "cursor-pointer text-center text-white font-semibold border rounded-xl mr-4 mb-8 p-16 transition-colors duration-300",
                                    selected === e.value ? "bg-[#F4AC45]" : "bg-[#F42C04] hover:bg-[#F4AC45]"
                                )}
                            >
                                {e.label}
                            </div>
                        ))}
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