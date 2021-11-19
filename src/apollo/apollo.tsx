import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    makeVar,
    NormalizedCacheObject
} from '@apollo/client';
import { TOKEN, DARK_MODE } from './constance';
import { setContext } from '@apollo/client/link/context';
import { splitLink } from './splitLink';

export const isLoggedInVar = makeVar(false);

// darkMode의 상태를 위한 reactive variable
// darkmode설정이 localstorage에 존재하면 true 아니라면 false로 초기화
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

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
            token: localStorage.getItem(TOKEN)
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

//     {
//     typePolicies: {
//         User: {
//             // 정확히 어떤 필드를 고유식별자로 설정할건지 설정함
//             keyFields: obj => `User:${obj.username}`
//         }
//     }
// }

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    // link: splitLink,
    link: authLink.concat(httpLink),
    cache
});
