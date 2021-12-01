import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { logUserOut } from 'apollo/apollo';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from 'fragments';
import Photo from 'components/feed/Photo';

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
            isLiked
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const Home = (): JSX.Element => {
    const { data } = useQuery(FEED_QUERY);

    const onLogOut = () => {
        logUserOut();
    };

    return (
        <div>
            {data?.seeFeed?.map((photo: any) => (
                <Photo key={photo.id} {...photo} />
            ))}
            <button onClick={onLogOut}>Log Out!</button>
        </div>
    );
};

export default Home;
