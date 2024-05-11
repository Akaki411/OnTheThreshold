import {ADMIN_ROUTE, HOME_ROUTE} from "./utils/consts";
import Admin from "./pages/admin/admin";
import Home from "./pages/home/home";

export const secureRoutes =
    [
        {
            path: ADMIN_ROUTE,
            Component: Admin
        }
    ]

export const publicRoutes =
    [
        {
            path: HOME_ROUTE,
            Component: Home
        }
    ]