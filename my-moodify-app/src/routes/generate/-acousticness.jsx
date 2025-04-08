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

export default function AcousticnessComponent({ handleNext }) {

    const acousticness = [
        {
            id: 1,
            label: "I don't want that many acoustic instruments",
            value: 1

        },
        {
            id: 2,
            label: "I want a balance between acoustic instruments and non-acoustic instruments",
            value: 0.5

        },
        {
            id: 3,
            label: "No acoustic instruments",
            value: 0

        },
    ]

    const [selected, setSelected] = useState("")

    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Choose An Acousticness Levels</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        {acousticness.map((element) => (
                            <div
                                key={element.id}
                                onClick={() => setSelected(element.id)}
                                className={cn(
                                    "cursor-pointer text-center text-white font-semibold border rounded-xl mr-4 mb-8 px-16 transition-colors duration-300",
                                    selected === element.id ? "bg-[#F4AC45]" : "bg-[#F42C04] hover:bg-[#F4AC45]"
                                )}
                            >
                                {element.label}
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