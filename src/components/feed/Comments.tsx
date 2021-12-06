import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

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
const Comments = ({ author, caption, commentNumber, comments }: Props) => {
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
        </CommentsContainer>
    );
};

export default Comments;
