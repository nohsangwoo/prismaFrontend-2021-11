import React from 'react';
import Comment from './Comment';
import registerList from './registerList';
import useUser from 'hooks/useUser';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { gql, useMutation } from '@apollo/client';
import {
    createComment,
    createCommentVariables
} from '__generated__/createComment';

type FormValues = {
    payload: string;
};

const yupSchema = yup
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
            id
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

const PostCommentContainer = styled.div`
    margin-top: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-top: 1px solid ${props => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
    width: 100%;
    &::placeholder {
        font-size: 12px;
    }
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
    const { data: userData } = useUser();

    const { register, handleSubmit, setValue, getValues } = useForm<FormValues>(
        {
            resolver: yupResolver(yupSchema),
            mode: 'onChange',
            defaultValues: {
                payload: ''
                // userName: location?.state?.userName || '',
            }
        }
    );

    const [createCommentMutation, { loading }] = useMutation<
        createComment,
        createCommentVariables
    >(CREATE_COMMENT_MUTATION, {
        // mutation이 끝난이후 cache 업데이트를 위한 작업
        update: (cache, result) => {
            const { payload } = getValues();
            setValue('payload', '');
            const { data } = result;
            if (data?.createComment.ok && userData?.me) {
                const newComment = {
                    __typename: 'Comment',
                    createdAt: Date.now() + '',
                    id: data.createComment.id,
                    isMine: true,
                    payload,
                    user: {
                        ...userData.me
                    }
                };

                // comments의 _ref를 위한 Comment fragment를 cache에 추가하는 작업
                const newCacheComment = cache.writeFragment({
                    data: newComment,
                    fragment: gql`
                        fragment BSName on Comment {
                            id
                            createdAt
                            isMine
                            payload
                            user {
                                userName
                                avatar
                            }
                        }
                    `
                });

                cache.modify({
                    id: `Photo:${photoId}`,
                    fields: {
                        comments(prev) {
                            return [...prev, newCacheComment];
                        },
                        commentNumber(prev) {
                            return prev + 1;
                        }
                    }
                });
            }
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
    };

    const InputParts = registerList.map((data, index) => {
        return (
            <div key={index}>
                <PostCommentInput
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
            <PostCommentContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>{InputParts}</form>
            </PostCommentContainer>
        </CommentsContainer>
    );
};

export default Comments;
