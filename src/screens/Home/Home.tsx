import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    faBookmark,
    faComment,
    faHeart,
    faPaperPlane
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
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
            isLiked
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

const PhotoContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.borderColor};
    margin-bottom: 60px;
    max-width: 615px;
`;

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
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
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
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
                                        style={{
                                            color: photo.isLiked
                                                ? 'tomato'
                                                : 'inherit'
                                        }}
                                        icon={
                                            photo.isLiked ? SolidHeart : faHeart
                                        }
                                    />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon icon={faComment} />
                                </PhotoAction>
                                <PhotoAction>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </PhotoAction>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBookmark} />
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
