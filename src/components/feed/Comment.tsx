import React from 'react';
// import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from 'styles/sharedStyle';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
    deleteComment,
    deleteCommentVariables
} from '__generated__/deleteComment';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id) {
            ok
        }
    }
`;

const CommentContainer = styled.div`
    margin-bottom: 7px;
`;

const CommentCaption = styled.span`
    margin-left: 10px;
    a {
        background-color: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

interface Props {
    id?: number;
    photoId?: number;
    author: string;
    payload: string;
    isMine?: boolean;
}

const Comment = ({ id, photoId, author, payload, isMine }: Props) => {
    const [deleteCommentMutation] = useMutation<
        deleteComment,
        deleteCommentVariables
    >(DELETE_COMMENT_MUTATION, {
        // variables: { id: id || 0 },
        update: (cache, result) => {
            const { data } = result;
            if (data?.deleteComment.ok) {
                // cache에 있는 comment를 찾아서 내쫓다(지움)
                cache.evict({ id: `Comment:${id}` });
                // comment를 cache에서 지운다음 photo의 commentNumber에서 1을 빼준값을 덮어씌움
                cache.modify({
                    id: `Photo:${photoId}`,
                    fields: {
                        commentNumber(prev: number) {
                            return prev - 1;
                        }
                    }
                });
            }
        }
    });

    const onDeleteClick = () => {
        if (!id) {
            alert('id가 전달되지 않았습니다. 다시 시도해주세요.');
            return;
        }
        // useMutation hook 사용
        deleteCommentMutation({
            variables: { id: id }
        });
    };

    return (
        <CommentContainer>
            <FatText>{author}</FatText>

            <CommentContainer>
                {/* 띄워쓰기를 기준으로 배열을 만든다음 다시 나열해주는데 
                이때 만약 나열되는 목록중 해시태그라면 클릭시 
                해당 키워드로 검색하는 창으로 넘거아게한다*/}
                <CommentCaption>
                    {payload.split(' ').map((word, index) =>
                        /#[\w]+/g.test(word) ? (
                            <React.Fragment key={index}>
                                <Link to={`/hashtags/${word}`}>{word}</Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment key={index}>{word}</React.Fragment>
                        )
                    )}
                </CommentCaption>
                {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
            </CommentContainer>
        </CommentContainer>
    );
};

export default Comment;
