import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import {Provider } from 'react-redux'
||||||| merged common ancestors
=======
import { Redirect } from 'react-router'
import { Provider } from 'react-redux'
import RequireAuth from '../components/RequireAuth';
>>>>>>> 11330c79483976b90d5a261a6c66d2917b7145f4
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
<<<<<<< HEAD
                <Route exact path="/" component={Home} />
||||||| merged common ancestors
            <Route exact path="/" component={Home} />
=======
                <Route exact path="/"
                    component={(props) => (
                        <RequireAuth
                            {...props}
                            Component={Home}
                        />
                    )} />
>>>>>>> 11330c79483976b90d5a261a6c66d2917b7145f4
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
<<<<<<< HEAD
                <Route exact path="/myprofile" component={MyProfile} />
                <Route path="*" component={Login} />
||||||| merged common ancestors
                <Route exact path="/profile" component={MyProfile} />
=======
                <Route exact path="/myprofile" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={MyProfile}
                    />
                )} />
                <Route path="*" ><Redirect to="/login" /></Route>
>>>>>>> 11330c79483976b90d5a261a6c66d2917b7145f4
            </Switch>
        </Provider>
    )
}
export default Routes;

