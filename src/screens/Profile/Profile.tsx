import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { userName } = useParams();
    console.log('userName', userName);
    return <div>'Profile'</div>;
};

export default Profile;
