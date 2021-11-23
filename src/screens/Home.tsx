import React from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
import styled from 'styled-components';

const Title = styled.h1`
    color: bisque;
`;

const Home = (): JSX.Element => {
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(userSlice.actions.setLoggedOut());
        dispatch(userSlice.actions.clearToken());
    };

    return (
        <div>
            <Title>Home</Title>
            <div>WELCOME HAHA!</div>
            <button onClick={onLogOut}>Log Out!</button>
        </div>
    );
};

export default Home;
