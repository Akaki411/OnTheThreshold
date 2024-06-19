import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import WorksStore from "./store/WorksStore";
import NewsStore from "./store/NewsStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        works: new WorksStore(),
        news: new NewsStore()
    }}>
        <App/>
    </Context.Provider>,
  document.getElementById('root')
);