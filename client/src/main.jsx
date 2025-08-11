import React, {createContext, StrictMode} from 'react';
import { createRoot } from 'react-dom/client'
import App from './app.jsx';
import UserStore from "./store/UserStore";
import WorksStore from "./store/WorksStore";
import NewsStore from "./store/NewsStore";

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
    <Context.Provider value={{
        user: new UserStore(),
        works: new WorksStore(),
        news: new NewsStore()
    }}>
        <App/>
    </Context.Provider>,
)
