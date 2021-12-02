import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
    faBookmark,
    faComment,
    faPaperPlane,
    faHeart
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from 'styles/sharedStyle';
import { FEED_QUERY } from 'screens/Home/Home';
import { toggleLike, toggleLikeVariables } from '__generated__/toggleLike';

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.borderColor};
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
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

const Comments = styled.div`
    margin-top: 20px;
`;

const Comment = styled.div``;

const CommentCaption = styled.span`
    margin-left: 10px;
`;

const CommentCount = styled.span`
    opacity: 0.7;
    margin: 10px 0px;
    display: block;
    font-weight: 600;
    font-size: 10px;
`;

interface Props {
    id: number;
    user: {
        avatar: string;
        userName: string;
    };
    file: string;
    caption: string;
    isLiked: boolean;
    likes: number;
    commentNumber?: number;
    comments: {
        id: number;
        user: {
            username: string;
            avatar: string;
        };
        payload: string;
        isMine: boolean;
        createdAt: string;
    }[];
}
const Photo = ({
    id,
    user,
    file,
    isLiked,
    likes,
    caption,
    commentNumber,
    comments
}: Props) => {
    const [toggleLikeMutation, { loading }] = useMutation<
        toggleLike,
        toggleLikeVariables
    >(TOGGLE_LIKE_MUTATION, {
        variables: {
            id
        },
        // refetchQueries: [{ query: FEED_QUERY }]
        update: (cache, result) => {
            if (result?.data?.toggleLike?.ok) {
                // 그냥 중복 제거를 위한 패턴작업
                const photoId = `Photo:${id}`;
                const fragment = gql`
                    fragment BSName on Photo {
                        isLiked
                        likes
                    }
                `;

                const prevPhoto: any = cache.readFragment({
                    id: photoId,
                    // fragment BSName on type
                    // Photo type의 isLike를 변경할꺼다 라는말
                    fragment
                });
                if ('isLiked' in prevPhoto && 'likes' in prevPhoto) {
                    const { isLiked: cacheIsLiked, likes: cacheLikes } =
                        prevPhoto;
                    cache.writeFragment({
                        id: photoId,
                        // fragment BSName on type
                        // Photo type의 isLike를 변경할꺼다 라는말
                        fragment,
                        // 변경하고싶은 데이터를 가져와서 덮어씌운다
                        // 이번은 넘겨받은 props의 반전값을 덮어씌운다
                        data: {
                            isLiked: !cacheIsLiked,
                            likes: cacheIsLiked
                                ? cacheLikes - 1
                                : cacheLikes + 1
                        }
                    });
                }
            }
        }
    });

    const toggleLikeFunc = () => {
        toggleLikeMutation();
    };
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <Username>{user.userName}</Username>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeFunc}>
                            <FontAwesomeIcon
                                style={{
                                    color: isLiked ? 'tomato' : 'inherit'
                                }}
                                icon={isLiked ? SolidHeart : faHeart}
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
                <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
                <Comments>
                    <Comment>
                        <FatText>{user.userName}</FatText>
                        <CommentCaption>{caption}</CommentCaption>
                        <CommentCount>
                            {commentNumber === 1
                                ? '1 comment'
                                : `${commentNumber} commnets`}
                        </CommentCount>
                    </Comment>
                </Comments>
            </PhotoData>
        </PhotoContainer>
    );
};

export default Photo;
