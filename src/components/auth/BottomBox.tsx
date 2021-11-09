import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const SBttomBox = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${props => props.theme.accent};
    }
`;

interface Props {
    cta: string;
    link: string;
    linkText: string;
}

const BottomBox = ({ cta, link, linkText }: Props): JSX.Element => {
    return (
        <SBttomBox>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </SBttomBox>
    );
};

export default BottomBox;
