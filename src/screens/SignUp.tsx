import React from 'react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from 'components/auth/AuthLayout';
import BottomBox from 'components/auth/BottomBox';
import Button from 'components/auth/Button';
import FormBox from 'components/auth/FormBox';
import Input from 'components/auth/Input';
import { FatLink } from 'styles/sharedStyle';
import routes from 'Router/routePath';
import PageTitle from 'components/PageTitle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import FormError from 'components/auth/FormError';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SubTitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
};

const schema = yup
    .object({
        // 인자로 string형식의 데이터를 추가하면 에러 메시지를 수정할수 있다.
        firstName: yup
            .string()
            // .email()
            .min(5, 'Username should be longer than 5 chars.')
            .required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        userName: yup.string().required(),
        password: yup.string().required()
    })
    .required();

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState,
        getValues,
        setError,
        clearErrors
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmitValid: SubmitHandler<FormValues> = () => {
        console.log('onSubmit');
    };

    console.log(watch()); // watch input value by passing the name of it

    console.log('formState.errors: ', formState.errors);

    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <SubTitle>
                        Sign up to see photos and videos from your friends.
                    </SubTitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register('firstName')}
                        type="text"
                        placeholder="First Name"
                    />

                    {typeof formState.errors.firstName?.message ===
                        'string' && (
                        <FormError
                            message={formState.errors.firstName?.message}
                        />
                    )}
                    <Input
                        {...register('lastName')}
                        type="text"
                        placeholder="Last Name"
                    />
                    {typeof formState.errors.lastName?.message === 'string' && (
                        <FormError
                            message={formState.errors.lastName?.message}
                        />
                    )}
                    <Input
                        {...register('email')}
                        type="text"
                        placeholder="Email"
                    />
                    {typeof formState.errors.lastName?.message === 'string' && (
                        <FormError
                            message={formState.errors.lastName?.message}
                        />
                    )}
                    <Input
                        {...register('userName')}
                        type="text"
                        placeholder="Username"
                    />
                    {typeof formState.errors.userName?.message === 'string' && (
                        <FormError
                            message={formState.errors.userName?.message}
                        />
                    )}
                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                    />
                    {typeof formState.errors.password?.message === 'string' && (
                        <FormError
                            message={formState.errors.password?.message}
                        />
                    )}
                    <Button type="submit" value="Sign up" />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                linkText="Log in"
                link={routes.home}
            />
        </AuthLayout>
    );
};

export default SignUp;
