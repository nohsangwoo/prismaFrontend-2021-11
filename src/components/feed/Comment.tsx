import React from 'react';
import styled from 'styled-components';
import { FatText } from 'styles/sharedStyle';

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
`;

interface Props {
    author: string;
    payload: string;
}

const Comment = ({ author, payload }: Props) => {
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>{payload}</CommentCaption>
        </CommentContainer>
    );
};

export default Comment;
