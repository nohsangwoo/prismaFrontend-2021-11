import React from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from 'apollo/apollo';

const Login = (): JSX.Element => {
    const isLoggedInFromReactiveVar = useReactiveVar(isLoggedInVar);

    const dispatch = useDispatch();
    return (
        <div>
            <h1>Login</h1>

            <button onClick={() => dispatch(userSlice.actions.setLoggedIn())}>
                Log in now!
            </button>

            <div>{`isLoggedInFromReactiveVar: ${isLoggedInFromReactiveVar}`}</div>

            <button onClick={() => isLoggedInVar(!isLoggedInFromReactiveVar)}>
                toggle is isLoggedIn from Reactive Var
            </button>
        </div>
    );
};

export default Login;
