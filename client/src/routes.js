import {
    ADMIN_ROUTE,
    ARTICLE_ROUTE,
    AUTH_ROUTE,
    HOME_ROUTE,
    LOGOUT_ROUTE,
    NEWS_ROUTE,
    WORKS_ROUTE,
    BOOKS_ROUTE
} from "./utils/consts";
import Admin from "./pages/admin/admin";
import Home from "./pages/home/home";
import Works from "./pages/works/works";
import News from "./pages/news/news";
import Auth from "./pages/auth/auth";
import Logout from "./pages/logout/logout";
import Article from "./pages/article/article";
import Books from "./pages/books/books"

export const routes =
    [
        {
            path: ADMIN_ROUTE,
            Component: <Admin/>
        },
        {
            path: LOGOUT_ROUTE,
            Component: <Logout/>
        },
        {
            path: HOME_ROUTE,
            Component: <Home/>
        },
        {
            path: WORKS_ROUTE,
            Component: <Works/>
        },
        {
            path: NEWS_ROUTE,
            Component: <News/>
        },
        {
            path: AUTH_ROUTE,
            Component: <Auth/>
        },
        {
            path: ARTICLE_ROUTE,
            Component: <Article/>
        },
        {
            path: BOOKS_ROUTE,
            Component: <Books/>
        }
    ]