import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_FRAGMENT } from 'fragments';
import { gql, useQuery } from '@apollo/client';
import { seeProfile, seeProfileVariables } from '__generated__/seeProfile';

const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName: $userName) {
            firstName
            lastName
            userName
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

const Profile = () => {
    const { userName } = useParams();

    const { data } = useQuery<seeProfile, seeProfileVariables>(
        SEE_PROFILE_QUERY,
        {
            variables: {
                userName: userName || ''
            }
        }
    );
    return <div>'Profile'</div>;
};

export default Profile;
