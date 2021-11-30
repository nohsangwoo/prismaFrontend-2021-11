import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    max-width: 615px;
`;

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
    min-height: 50vh;
    max-height: 50vh;
    object-fit: cover;
`;

const PhotoData = styled.div`
    padding: 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
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
                        <Avatar url={photo.user.avatar} lg />
                        <Username>{photo.user.userName}</Username>
                    </PhotoHeader>
                    <PhotoFile src={photo.file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        size={'2x'}
                                        icon={faHeart}
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        size={'2x'}
                                        icon={faComment}
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        size={'2x'}
                                        icon={faPaperPlane}
                                    />
                                </PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    size={'2x'}
                                    icon={faBookmark}
                                />
                            </div>
                        </PhotoActions>
                        <Likes>
                            {photo.likes === 1
                                ? '1 like'
                                : `${photo.likes} likes`}
                        </Likes>
                    </PhotoData>
                </PhotoContainer>
            ))}
            <button onClick={onLogOut}>Log Out!</button>
        </div>
    );
};

export default Home;
