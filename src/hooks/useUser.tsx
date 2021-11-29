import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logUserOut } from 'apollo/apollo';

const ME_QUERY = gql`
    query me {
        me {
            userName
            avatar
        }
    }
`;

const useUser = (): JSX.Element => {
    const hasToken = useSelector((state: RootState) => state.users.isLoggedIn);
    const { data } = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    useEffect(() => {
        // 토큰이 변조됐다면 강제 로그아웃 시켜준다.
        if (data?.me === null) {
            logUserOut();
        }
        if (data?.me !== null) {
            // logUserOut();
            console.log('data is here:', data?.me);
        }
    }, [data]);
    // console.log('useUser result: ', data, error);
    return <></>;
};
export default useUser;
