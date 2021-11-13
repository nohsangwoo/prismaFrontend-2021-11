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
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

type FormValues = {
    username: string;
    password: string;
};

const schema = yup
    .object({
        // 인자로 string형식의 데이터를 추가하면 에러 메시지를 수정할수 있다.
        username: yup.string().email().required(),
        // potato라는 문자를 포함해야하는 경우(응용 가능)
        // password: yup.string().min(5).required().oneOf(['potato'])
        password: yup.string().min(5).required().oneOf(['potato'])
    })
    .required();

function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log('haha: ', data);
    };

    console.log(watch()); // watch input value by passing the name of it

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('username')}
                        type="text"
                        placeholder="Username"
                    />
                    <p>{errors.username?.message}</p>

                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>

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
