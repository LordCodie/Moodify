import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function GenreComponent() {
    return (
        <div className="p-8">
            <Card className="bg-white">

                <CardHeader>
                    <CardTitle className="text-center">Pick Your Favourite Genre</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>
                    <div>Hip-Hop</div>
                    <div>R&B</div>
                    <div>House</div>
                    <div></div>
                </CardContent>

                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}