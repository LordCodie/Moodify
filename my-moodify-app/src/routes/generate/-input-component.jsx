import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function InputComponent({ feeling, handleFeeling, handleNext }) {
    return (
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Tell Me How You're Feeling ?</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>

                    <div className="md:flex justify-center items-center flex-wrap">
                        <Input
                            type="text"
                            placeholder="Give me some words"
                            onChange={handleFeeling}
                            value={feeling}
                            className="text-lg"
                        />
                    </div>

                </CardContent>

                <CardFooter className="w-full flex justify-end items-end">
                    <Button
                        className="bg-[#F4AC45] hover:bg-[#F42C04]"
                        onClick={handleNext}>
                        <Send /> Send
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}