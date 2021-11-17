import React from 'react';
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
import PageTitle from 'components/PageTitle';
import { useForm } from 'react-hook-form';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

function Login() {
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(data => console.log(data));

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
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
