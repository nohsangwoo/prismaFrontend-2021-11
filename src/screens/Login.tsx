import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from 'apollo/apollo';
import styled, { css } from 'styled-components';

const Title = styled.h1`
    color: bisque;
    font-family: -apple--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const PotatoBTN = styled.button<{ CheckProps?: String }>`
    color: red;
    ${props =>
        props.CheckProps
            ? css`
                  color: red;
              `
            : css`
                  color: blue;
              `}
`;

const Container = styled.div`
    background-color: tomato;
`;

const Login = (): JSX.Element => {
    const [potato, setPotato] = useState(false);

    const togglePotato = () => setPotato((prev: boolean) => !prev);

    const isLoggedInFromReactiveVar = useReactiveVar(isLoggedInVar);

    const dispatch = useDispatch();
    return (
        <Container>
            <Title>Login</Title>

            <button onClick={() => dispatch(userSlice.actions.setLoggedIn())}>
                Log in now!
            </button>

            <div>{`isLoggedInFromReactiveVar: ${isLoggedInFromReactiveVar}`}</div>

            <button onClick={() => isLoggedInVar(!isLoggedInFromReactiveVar)}>
                toggle is isLoggedIn from Reactive Var
            </button>

            <div>{`current potato state: ${potato}`}</div>
            <PotatoBTN onClick={() => togglePotato()}>toggle potato</PotatoBTN>
        </Container>
    );
};

export default Login;
