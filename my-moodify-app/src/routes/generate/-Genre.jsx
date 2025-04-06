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
        <div className="p-12">
            <Card className="bg-white mt-16">

                <CardHeader>
                    <CardTitle className="text-center text-xl">Pick Your Favourite Genre</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>

                <CardContent>
                    <div className="md:flex justify-center items-center flex-wrap">
                        <div className="text-center border mr-4 mb-8 p-16">Hip-Hop</div>
                        <div className="text-center border mr-4 mb-8 p-16">R&B</div>
                        <div className="text-center border mr-4 mb-8 p-16">House</div>
                        <div className="text-center border mr-4 mb-8 p-16">Pop</div>
                    </div>


                </CardContent>

                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}