import React from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
const Login = (): JSX.Element => {
    const dispatch = useDispatch();
    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => dispatch(userSlice.actions.setLoggedIn())}>
                Log in now!
            </button>
        </div>
    );
};

export default Login;
