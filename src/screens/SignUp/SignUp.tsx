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
import registerList from './registerList';

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
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        userName: yup.string().required(),
        password: yup.string().required()
    })
    .required();

const CREATE__ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $userName: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            userName: $userName
            email: $email
            password: $password
        ) {
            ok
            error
            id
        }
    }
`;

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

    const onCompleted = (data: {
        // react hook form 에서 submit 한 후 순간 입력된 값에서 추출

        createAccount: { ok: boolean; error: string; id: number };
    }) => {
        // const { userName, password } = getValues();

        // const {
        //     createAccount: { ok, error, id }
        //     //   createAccount: { ok },
        // } = data;
        console.log('oncomplete data: ', data);
        // console.log(error);
        // if (!ok) {
        //     return;
        // }
    };

    const [createAccount, { data, loading, error }] = useMutation(
        CREATE__ACCOUNT_MUTATION,
        {
            onCompleted
        }
    );

    const onSubmitValid: SubmitHandler<FormValues> = data => {
        if (loading) {
            return;
        }

        console.log('submit data!: ', data);
        // return;
        createAccount({
            variables: {
                ...data
            }
        });
    };

    console.log(watch()); // watch input value by passing the name of it

    console.log('formState.errors: ', formState.errors);

    const InputParts = registerList.map((data, index) => {
        console.log('index', index);
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
                    <Button
                        type="submit"
                        value="Sign up"
                        // value={loading ? 'Loading...' : 'Sign up'}
                        // disabled={!formState.isValid || loading}
                    />
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
