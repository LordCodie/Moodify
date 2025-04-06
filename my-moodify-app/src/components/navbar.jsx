import { Link } from "@tanstack/react-router"
import logo from "/moodify-transparent-background-small.png"

export default function Navbar() {
    return (
        <nav className="shadow-md">
            <Link to="/">
                <img src={logo} className="h-16 px-6" alt="logo" />
            </Link>
        </nav>
    )
}