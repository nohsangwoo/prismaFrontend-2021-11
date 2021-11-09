import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

const BottomBox = styled(WhiteBox)`
    padding: 10px 0px;
    text-align: center;
`;

const Login = (): JSX.Element => {
    return (
        <Container>
            <div>
                <TopBox>
                    <h1>instagram</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <span>Or</span>
                    <span>Log in with Facebook</span>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span>
                    <a href="http://#">Sign up</a>
                </BottomBox>
            </div>
        </Container>
    );
};

export default Login;
