import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    makeVar,
    NormalizedCacheObject
} from '@apollo/client';
import { TOKEN } from './constance';
import { setContext } from '@apollo/client/link/context';
import reduxStore from 'store/store';
import userSlice from 'store/reducers/userSlice';
// import { splitLink } from './splitLink';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// 여기서 dipatch 하지 않으면 token보낼때 좀 문제가 생겨서 로그인 로그아웃 정도는 여기서 구현함
export const logUserIn = (token: string) => {
    reduxStore.dispatch(userSlice.actions.setToken(token));
    reduxStore.dispatch(userSlice.actions.setLoggedIn());
};

export const logUserOut = () => {
    reduxStore.dispatch(userSlice.actions.setLoggedOut());
    reduxStore.dispatch(userSlice.actions.clearToken());
    // window.location.reload();
};

// end of login logout for current information

// backend와 연결하기 위한 주소 세팅
const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_PROD_URI
            : 'http://localhost:4000/graphql'
});

// setContext함수는 클라이언트의 모든 Request에 몇가지 항목을 추가하는 일을 한다
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            // 기존의 headers내용을 뿌려주고
            ...headers,
            // 그 위에 새로운 headers의 내용을 덮어 씌워준다.
            // backend로 전달하는 headers의 form을 맞춰줘야한다
            // client에선 headers{token:"some token"}으로 보내는데
            // backend에선 headers{tokkkkken: "some token"} 이란 형식으로 받아서 사용한다던지
            // 이런경우를 방지하기위해 키값을 잘 지정해줘야함
            // authorization: localStorage.getItem(TOKEN)
            authorization: reduxStore.getState().users.token
        }
    };
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                feed: {
                    keyArgs: false
                }
            }
        }
    }
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    // link: authLink.concat(splitLink),
    link: authLink.concat(httpLink),
    cache
});
