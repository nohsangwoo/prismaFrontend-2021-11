import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { logUserOut } from 'apollo/apollo';
import Avatar from 'components/Avatar';
import { FatText } from 'styles/sharedStyle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from 'fragments';

const FEED_QUERY = gql`
    query seeFeed($endCursor: Int) {
        seeFeed(endCursor: $endCursor) {
            ...PhotoFragment
            user {
                userName
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
    padding: 5px 10px;
    display: flex;
    align-items: center;
`;

const Username = styled(FatText)`
    margin-left: 5px;
`;

const Home = (): JSX.Element => {
    const queryResult = useQuery(FEED_QUERY);
    const { data } = queryResult;

    console.log('queryResult: ', queryResult);
    console.log('seeFeed: ', data);

    const onLogOut = () => {
        logUserOut();
    };

    return (
        <div>
            {data?.seeFeed?.map((photo: any) => (
                <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar url={photo.user.avatar} />
                        <Username>{photo.user.userName}</Username>
                    </PhotoHeader>
                </PhotoContainer>
            ))}
            <button onClick={onLogOut}>Log Out!</button>
        </div>
    );
};

export default Home;
