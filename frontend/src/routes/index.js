import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Provider } from 'react-redux'
import RequireAuth from '../components/RequireAuth';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyProfile from '../pages/MyProfile';
import Register from '../pages/Register';
import Store from '../store'
const Routes = () => {
    const location = useLocation();
    return (

        <Provider store={Store}>
            <Switch>
                <Route exact path="/"
                    component={(props) => (
                        <RequireAuth
                            {...props}
                            Component={Home}
                        />
                    )} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/myprofile" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={MyProfile}
                    />
                )} />
                <Route path="*" ><Redirect to="/login" /></Route>
            </Switch>
        </Provider>
    )
}
export default Routes;

