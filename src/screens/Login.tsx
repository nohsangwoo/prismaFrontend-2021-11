import React, { useState } from 'react';
import {
    faFacebookSquare,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from 'components/auth/AuthLayout';
import FormBox from 'components/auth/FormBox';
import styled from 'styled-components';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import routes from '../Router/routePath';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    const [username, setUsername] = useState('');
    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        return setUsername(event.target.value);
    };
    return (
        <AuthLayout>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form>
                    <Input
                        value={username}
                        onChange={onUsernameChange}
                        type="text"
                        placeholder="Username"
                    />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Log in" />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signUp}
            />
        </AuthLayout>
    );
}
export default Login;
