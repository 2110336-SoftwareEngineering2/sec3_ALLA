import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Navigation from '../Navigation'
const RequireAuth = ({ Component, ...rest }) => {
    const dispatch = useDispatch();
    dispatch({ type: "GET_LOGIN_INFO" })
    const token = useSelector(state => state.Auth.token)
    //console.log('token form reqauth',token)
    //const id = useSelector(state => state.Auth.id)
    //const authStore = useContext(AuthStoreContext);
    if (isEmpty(token)) {
        return <Redirect to="/login" />;
    }
    return (<>
        <Navigation />
        <Component {...rest} />
    </>);
};

export default RequireAuth;
