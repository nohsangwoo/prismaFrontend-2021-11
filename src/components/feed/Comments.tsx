import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Comment from './Comment';
import { gql, useMutation } from '@apollo/client';
import {
    createComment,
    createCommentVariables
} from '__generated__/createComment';
import registerList from './registerList';
import Input from 'components/auth/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
    payload: string;
};

const schema = yup
    .object({
        // 인자로 string형식의 데이터를 추가하면 에러 메시지를 수정할수 있다.
        payload: yup
            .string()
            // .email()
            // .min(5, 'userName should be longer than 5 chars.')
            .required()
    })
    .required();

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId: $photoId, payload: $payload) {
            ok
            error
        }
    }
`;

const CommentsContainer = styled.div`
    margin-top: 20px;
`;
const CommentCount = styled.span`
    opacity: 0.7;
    margin: 10px 0px;
    display: block;
    font-weight: 600;
    font-size: 10px;
`;

interface Props {
    photoId: number;
    author: string;
    caption: string;
    commentNumber?: number;
    comments: {
        id: number;
        user: {
            userName: string;
            avatar: string;
        };
        payload: string;
        isMine: boolean;
        createdAt: string;
    }[];
}
const Comments = ({
    photoId,
    author,
    caption,
    commentNumber,
    comments
}: Props) => {
    const [createCommentMutation, { loading }] = useMutation<
        createComment,
        createCommentVariables
    >(CREATE_COMMENT_MUTATION);

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            payload: ''
            // userName: location?.state?.userName || '',
        }
    });

    const onSubmitValid: SubmitHandler<FormValues> = data => {
        if (loading) {
            return;
        }

        createCommentMutation({
            variables: {
                photoId,
                payload: data.payload
            }
        });

        setValue('payload', '');
    };

    const InputParts = registerList.map((data, index) => {
        return (
            <div key={index}>
                <Input
                    {...register(`${data.registerKey}`)}
                    type={data.type}
                    placeholder={data.placeholder}
                    autoComplete={'off'}
                />
            </div>
        );
    });
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>
                {commentNumber === 1
                    ? '1 comment'
                    : `${commentNumber} comments`}
            </CommentCount>
            {comments?.map(comment => (
                <Comment
                    key={comment.id}
                    author={comment.user.userName}
                    payload={comment.payload}
                />
            ))}
            <div>
                <form onSubmit={handleSubmit(onSubmitValid)}>{InputParts}</form>
            </div>
        </CommentsContainer>
    );
};

export default Comments;
