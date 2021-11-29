import { logUserOut } from 'apollo/apollo';
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: bisque;
`;

const Home = (): JSX.Element => {
    const onLogOut = () => {
        logUserOut();
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
