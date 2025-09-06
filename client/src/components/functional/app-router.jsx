import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {routes} from "../../routes.jsx";
import {HOME_ROUTE} from "../../utils/consts.js";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component} exact/>
            )}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace={true} />}/>
        </Routes>
    );
}

export default AppRouter;