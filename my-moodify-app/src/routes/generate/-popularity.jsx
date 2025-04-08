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

export default function PopularityComponent({ handleNext, handlePopularity }) {
    const [selected, setSelected] = useState(null)

    const isNextDisabled = selected === null

    const popularity = [
        {
            id: 1,
            label: "I don't want popular songs",
            value: 0
        },
        {
            id: 2,
            label: "I don't really care",
            value: 50
        },
        {
            id: 3,
            label: "I want something popular",
            value: 100
        },
    ]


    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Do You Want Popular Songs</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        <div>
                            {popularity.map((e) => (
                                <div
                                    key={e.id}
                                    onClick={() => {
                                        setSelected(e.id)
                                        handlePopularity(e.value)
                                    }}
                                    className={cn(
                                        "cursor-pointer text-center text-white font-semibold border rounded-xl mr-4 mb-8 px-24 transition-colors duration-300",
                                        selected === e.id ? "bg-[#F4AC45]" : "bg-[#F42C04] hover:bg-[#F4AC45]"
                                    )}
                                >
                                    {e.label}
                                </div>
                            ))}
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="w-full">
                    <div className="w-full flex justify-end items-end">
                        <Button
                            className="bg-[#F4AC45] hover:bg-[#F42C04]"
                            onClick={handleNext}
                            disabled={isNextDisabled}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}