import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logUserOut } from 'apollo/apollo';

const ME_QUERY = gql`
    query me {
        me {
            id
            userName
            avatar
        }
    }
`;

const useUser = () => {
    const hasToken = useSelector((state: RootState) => state.users.isLoggedIn);
    const { data } = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    useEffect(() => {
        // 토큰이 변조됐다면 강제 로그아웃 시켜준다.
        if (data?.me === null) {
            logUserOut();
        }
    }, [data]);
    return { data };
};
export default useUser;
