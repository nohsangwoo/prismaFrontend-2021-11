import React from 'react';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
import styled from 'styled-components';

const Title = styled.h1`
    color: bisque;
`;

const Home = (): JSX.Element => {
    const dispatch = useDispatch();
    return (
        <div>
            <Title>Home</Title>
            <button onClick={() => dispatch(userSlice.actions.setLoggedOut())}>
                Log Out!
            </button>
        </div>
    );
};

export default Home;
