import React from 'react';
import styled from 'styled-components';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import toggleSlice from 'store/reducers/toggleSlice';

const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`;

const Footer = styled.footer`
    margin-top: 20px;
`;

const DarkModeBtn = styled.span`
    cursor: pointer;
`;

interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: Props): JSX.Element => {
    const darkMode = useSelector((state: RootState) => state.toggles.darkMode);
    const dispatch = useDispatch();

    const toggleDarkMode = () => {
        darkMode
            ? dispatch(toggleSlice.actions.setDisableDarkMode())
            : dispatch(toggleSlice.actions.setEnableDarkMode());
    };
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
            <Footer>
                <DarkModeBtn onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </DarkModeBtn>
            </Footer>
        </Container>
    );
};

export default AuthLayout;
