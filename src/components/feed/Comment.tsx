import React from 'react';
// import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from 'styles/sharedStyle';
import { Link } from 'react-router-dom';

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
    author: string;
    payload: string;
}

const Comment = ({ author, payload }: Props) => {
    // const cleanedPayload = sanitizeHtml(
    //     payload.replace(/#[\w]+/g, '<mark>$&</mark>'),
    //     {
    //         allowedTags: ['mark']
    //     }
    // );

    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            {/* <CommentCaption
                dangerouslySetInnerHTML={{
                    __html: cleanedPayload
                }}
            /> */}
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
            </CommentContainer>
        </CommentContainer>
    );
};

export default Comment;
