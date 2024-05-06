import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {secureRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && user.isAdmin && secureRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={HOME_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;