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

type registerListProps = {
    registerKey: `firstName` | `lastName` | `email` | `userName` | `password`;
    placeholder: string;
    type: string;
    clearErrors: boolean;
}[];

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

    const registerList: registerListProps = [
        {
            registerKey: `firstName`,
            placeholder: 'First Name',
            type: 'text',
            clearErrors: true
        },
        {
            registerKey: `lastName`,
            placeholder: 'Last Name',
            type: 'text',
            clearErrors: true
        },
        {
            registerKey: `email`,
            placeholder: 'Email',
            type: 'email',
            clearErrors: true
        },
        {
            registerKey: `userName`,
            placeholder: 'User Name',
            type: 'text',
            clearErrors: true
        },
        {
            registerKey: `password`,
            placeholder: 'Password',
            type: 'password',
            clearErrors: true
        }
    ];

    const InputParts = registerList.map(data => {
        return (
            <>
                <Input
                    {...register(`${data.registerKey}`)}
                    type={data.type}
                    placeholder={data.placeholder}
                    onFocus={() => (data.clearErrors ? clearErrors() : null)}
                />
                <FormError
                    message={formState.errors[data.registerKey]?.message || ''}
                />
            </>
        );
    });

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
                    {InputParts}
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
