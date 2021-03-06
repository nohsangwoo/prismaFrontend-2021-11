import React from 'react';
import styled from 'styled-components';
import { BaseBox } from '../../styles/sharedStyle';

const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`;

interface Props {
    children: React.ReactNode;
}

const FormBox = ({ children }: Props): JSX.Element => {
    return <Container>{children}</Container>;
};

export default FormBox;
