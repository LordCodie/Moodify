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

export default function InstrumentalnessComponent({ handleNext }) {

    const instrumentalness = [
        {
            id: 1,
            label: "More vocals and less instruments",
            value: 0
        },
        {
            id: 2,
            label: "I want a balance between instruments and vocals",
            value: 0.5
        },
        {
            id: 3,
            label: "I want more instruments less vocals",
            value: 1
        },
    ]

    const [selected, setSelected] = useState("")

    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Do You Want More Instrumentals</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        {instrumentalness.map((e) => (
                            <div
                                key={e.id}
                                onClick={() => setSelected(e.id)}
                                className={cn(
                                    "cursor-pointer text-center text-white font-semibold border rounded-xl mr-4 mb-8 px-24 transition-colors duration-300",
                                    selected === e.id ? "bg-[#F4AC45]" : "bg-[#F42C04] hover:bg-[#F4AC45]"
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