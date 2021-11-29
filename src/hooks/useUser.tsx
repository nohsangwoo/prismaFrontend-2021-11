import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const ME_QUERY = gql`
    query me {
        me {
            userName
            avatar
        }
    }
`;

function useUser() {
    const isLoggedIn = useSelector(
        (state: RootState) => state.users.isLoggedIn
    );
    const { data, error } = useQuery(ME_QUERY, {
        skip: !isLoggedIn
    });
    console.log('useUser result: ', data, error);
    return;
}
export default useUser;
