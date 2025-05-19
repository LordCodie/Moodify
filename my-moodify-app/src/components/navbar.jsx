import React, { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import logo from "/moodify-transparent-background-small.png"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"


function DisplayImage({ displayName }) {
    return (
        <div className="flex items-center">
            <span className="mr-2 font-medium text-base">{displayName}</span>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

{/* className="hidden md:block" */ }

function MenuDropdown({ signout, displayName }) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger><DisplayImage displayName={displayName} /></DropdownMenuTrigger>
                <DropdownMenuContent className="mx-20 w-full max-w-48 bg-white">
                    {/* <DropdownMenuLabel>Profile</DropdownMenuLabel> */}
                    {/* <DropdownMenuSeparator className="bg-black"/> */}
                    <DropdownMenuItem>
                        <Button
                            className="hover:bg-[#F4AC45] w-full"
                            onClick={signout}
                        >Log-Out</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default function Navbar() {
    const { currentUser, signout } = useAuth()

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        setIsLoggedIn(currentUser?.uid)
    }), [currentUser]

    // console.log(currentUser?.uid)
    // console.log(currentUser?.displayName)
    // console.log(currentUser)

    return (
        <nav className="shadow-md flex items-center justify-between px-6">
            <Link to="/">
                <img src={logo} className="h-16" alt="logo" />
            </Link>
            {isLoggedIn && <MenuDropdown signout={signout} displayName={currentUser?.displayName} />}
            {!isLoggedIn && <Button className="hover:bg-[#F4AC45]">
                <Link to="/login">Log-In</Link>
            </Button>}
        </nav>
    )
}