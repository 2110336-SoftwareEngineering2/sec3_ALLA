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
import EditProfile from '../pages/EditProfile'
import JobDetail from '../pages/JobDetail';
import ManageJob from '../pages/ManageJob'
import AddJob from '../pages/AddJob';

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
                <Route exact path="/editprofile" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={EditProfile}
                    />
                )} />
                <Route exact path="/job/:Jid" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={JobDetail} />
                )} />
                <Route exact path="/managejob" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={ManageJob}
                    />
                )} />
                 <Route exact path="/add-job" component={(props) => (
                    <RequireAuth
                        {...props}
                        Component={AddJob}
                    />
                )} />
                <Route path="*" ><Redirect to="/login" /></Route>

            </Switch>
        </Provider>
    )
}
export default Routes;

