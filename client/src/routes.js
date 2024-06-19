import {ADMIN_ROUTE, HOME_ROUTE, NEWS_ROUTE, WORKS_ROUTE} from "./utils/consts";
import Admin from "./pages/admin/admin";
import Home from "./pages/home/home";
import Works from "./pages/works/works";
import News from "./pages/news/news";


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
        },
        {
            path: WORKS_ROUTE,
            Component: Works
        },
        {
            path: NEWS_ROUTE,
            Component: News
        }
    ]