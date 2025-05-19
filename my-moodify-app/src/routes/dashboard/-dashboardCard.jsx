import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from '@tanstack/react-router'
import { Separator } from "@/components/ui/separator"

export const DashboardCard = ({ logo, title, link, description }) => {
    return (
        <Card className="mb-4 w-96 bg-black text-white">
            <Link to={link}>
                <CardContent>
                    <div className="flex justify-center mb-8">
                            {logo}
                    </div>
                    <Separator className="bg-stone-50"/>
                    <p className="text-xl py-2 font-semibold">{title}</p>
                    <p className="text-xs text-gray-300">{description}</p>
                </CardContent>
            </Link>
        </Card>

    )
}