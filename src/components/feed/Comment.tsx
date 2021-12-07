import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from 'styles/sharedStyle';

const CommentContainer = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
    mark {
        background-color: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

interface Props {
    author: string;
    payload: string;
}

const Comment = ({ author, payload }: Props) => {
    const cleanedPayload = sanitizeHtml(
        payload.replace(/#[\w]+/g, '<mark>$&</mark>'),
        {
            allowedTags: ['mark']
        }
    );

    console.log(cleanedPayload);
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption
                dangerouslySetInnerHTML={{
                    __html: cleanedPayload
                }}
            />
        </CommentContainer>
    );
};

export default Comment;
