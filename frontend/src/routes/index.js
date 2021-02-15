import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyProfile from '../pages/MyProfile';

const Routes = () => {
    const location = useLocation();
    return (
        <div>
            <Switch>
            <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={MyProfile} />
            </Switch>
        </div>
    )
}
export default Routes;

