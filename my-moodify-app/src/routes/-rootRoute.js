import { createRootRouteWithContext } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

export const RootRoute = createRootRouteWithContext()({
    component: () => <Outlet />
})