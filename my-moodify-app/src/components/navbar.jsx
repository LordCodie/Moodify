import { Link } from "@tanstack/react-router"
import logo from "/moodify-transparent-background-small.png"

import { Button } from "./ui/button"
import { Menu } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function DisplayImage() {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

{/* className="hidden md:block" */ }

function MenuDropdown() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><DisplayImage /></DropdownMenuTrigger>
                <DropdownMenuContent className="mx-20 w-full max-w-48 bg-white">
                    {/* <DropdownMenuLabel>Profile</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator className="bg-black"/> */}
                    <DropdownMenuItem>
                        <Button className="hover:bg-[#F4AC45] w-full">Log-Out</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


export default function Navbar() {
    const isLoggedIn = false
    return (
        <nav className="shadow-md flex items-center justify-between px-6">
            <Link to="/">
                <img src={logo} className="h-16" alt="logo" />
            </Link>
            {isLoggedIn && <MenuDropdown />}
            {!isLoggedIn && <Button className="hover:bg-[#F4AC45]">
                <Link to="/login">Log-In</Link>
            </Button>}
        </nav>
    )
}