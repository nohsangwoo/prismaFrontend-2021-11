import React from 'react';
import {
    faFacebookSquare,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from 'components/auth/AuthLayout';
import FormBox from 'components/auth/FormBox';
import styled from 'styled-components';
import BottomBox from '../../components/auth/BottomBox';
import Button from '../../components/auth/Button';
import Input from '../../components/auth/Input';
import Separator from '../../components/auth/Separator';
import routes from '../../Router/routePath';
import PageTitle from 'components/PageTitle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import FormError from 'components/auth/FormError';
import { useDispatch } from 'react-redux';
import userSlice from 'store/reducers/userSlice';
import registerList from './registerList';

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
    result?: string;
    // result: string;
};

const schema = yup
    .object({
        // 인자로 string형식의 데이터를 추가하면 에러 메시지를 수정할수 있다.
        username: yup
            .string()
            // .email()
            .min(5, 'Username should be longer than 5 chars.')
            .required(),
        password: yup.string().required()
    })
    .required();

const LOGIN_MUTATION = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            ok
            token
            error
        }
    }
`;

function Login() {
    const dispatch = useDispatch();

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

    const onCompleted = (data: any) => {
        const {
            login: { ok, error, token }
        } = data;
        // early return
        if (!ok) {
            return setError('result', {
                message: error
            });
        }
        dispatch(userSlice.actions.setToken(token));
        dispatch(userSlice.actions.setLoggedIn());
    };

    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted
    });

    const onSubmitValid: SubmitHandler<FormValues> = () => {
        if (loading) {
            return;
        }
        const { username, password } = getValues();
        login({
            variables: { userName: username, password }
        });
    };

    // console.log(watch()); // watch input value by passing the name of it

    const InputParts = registerList.map((data, index) => {
        return (
            <div key={index}>
                <Input
                    {...register(`${data.registerKey}`)}
                    type={data.type}
                    placeholder={data.placeholder}
                    onFocus={() =>
                        data.clearErrors ? clearErrors(data.registerKey) : null
                    }
                />
                <FormError
                    message={formState.errors[data.registerKey]?.message || ''}
                />
            </div>
        );
    });

    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    {InputParts}

                    {typeof formState.errors.password?.message === 'string' && (
                        <FormError
                            message={formState.errors.password?.message}
                        />
                    )}

                    <Button
                        type="submit"
                        value={loading ? 'Loading...' : 'Log in'}
                        disabled={!formState.isValid || loading}
                    />
                    {typeof formState?.errors?.result?.message === 'string' && (
                        <FormError
                            message={formState?.errors?.result?.message}
                        />
                    )}
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
