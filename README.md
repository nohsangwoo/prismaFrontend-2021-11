## setting up frontend

npx create-react-app app-name --template typescript

then

npm install --save typescript @types/node @types/react @types/react-dom @types/jest

## first connection - git

npm install --save-dev @types/react-router-dom

## apply eslint

-   ref: https://eslint.org/docs/user-guide/getting-started
<!-- -   npm install eslint --save-dev -->
-   npx eslint --init
-   erlintrc와 prettierrc설정을 잘 해준다
-   ref1: https://velog.io/@recordboy/ESLint-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
-   ref2: https://prettier.io/docs/en/integrating-with-linters.html

-   npm install eslint-config-prettier eslint-plugin-prettier -D
-   npm install --save-dev prettier

-   ref3: https://github.com/yannickcr/eslint-plugin-react#configuration
-   $ npm install eslint-plugin-react --save-dev //설치 및 적용
-   eslint는 익스텐션에서만 설치하는걸로.

## add airBnB condition for eslint

-   air bnb 규칙 적용해보기

-   npm install eslint-plugin-airbnb@latest --save-dev
-   규칙이 넘 빡시니깐 적용 제외

## install basic modules ...things...

-   styled conponents
    https://styled-components.com/
-   react hook form
    https://react-hook-form.com/
-   react router dom
    https://v5.reactrouter.com/web/guides/quick-start
-   apollo client
    https://www.apollographql.com/docs/react/get-started/
-   react helmet async
    https://www.npmjs.com/package/react-helmet-async
-   react font awesome
    https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react

-   total install things(copy and paste)
    npm install --save styled-components
    npm install react-hook-form
    npm i react-router-dom
    npm install @apollo/client graphql
    npm i react-helmet-async
    npm i --save @fortawesome/fontawesome-svg-core
    npm install --save @fortawesome/free-solid-svg-icons
    npm install --save @fortawesome/react-fontawesome
    npm install --save @fortawesome/free-brands-svg-icons
    npm install --save @fortawesome/free-regular-svg-icons

## setting up

-   router
-   authentication
-   arch
-   styles settings

## react-router-dom v6

v6에서 변경된점이 좀 있다.

-   component => element

```
// v6
<Routes>
    <Route path="/" element={<Home />} />
</Routes>
```

-   useHistory => useNavigation

```
// v5
const history = useHistory();

history.push('/home');
history.replace('/home');

// v6
const navigate = useNavigate();

navigate('/home');
navigate('/home', {replace: true});
```

## redux

-   ref: https://redux-toolkit.js.org/introduction/getting-started
    npm install @reduxjs/toolkit react-redux redux

    npm install redux-logger redux-persist redux-saga

## aos

npm i aos
npm i --save-dev @types/aos

## uuid

-   ref: https://www.npmjs.com/package/uuid
    npm i uuid
    npm i --save-dev @types/uuid

## material ui

-   ref: https://mui.com/
-   npm install @mui/material
-   npm install @material-ui/icons material-ui/core

## socket.io-client

-   npm install socket.io-client

## lodash

-   ref: https://lodash.com/

## apply redux and bug fix

## Router setup part

-   404 page setting

## reactive variable

-   learn usage

## test styled components

## apply theme provider with styled components

## apply darkmode

## apply globalStyles with styled components

-   css reset

## apollographql/apollo-tooling

-   ref: https://github.com/apollographql/apollo-tooling
-   setting tsconfig for apollo

## Login ui css

## setting basic login form

## share components

## login css part

## sign up ui

## when use normal form usage before use hookform

## separate Routes parts

## apply react helmet async

## react hook form usage

## yup - validate(with react hook form)

-   ref: https://www.npmjs.com/package/yup
-   npm install @hookform/resolvers yup

## apply apollo client

-   ref: https://www.apollographql.com/docs/react/api/core/ApolloClient/
-   cache 관련 내용
    https://www.apollographql.com/docs/react/caching/cache-configuration/

## usage of login mutation

## 백엔드 연결문제

-   백엔드에 쿼리는 날라가는데 응답이 이상함 파악좀 해야지

## usage of setError in use hook form

-   use hook form에서 에러핸들링 방법

## clearError사용법 in use hook form

## save token in redux

## prepare to login, logout, clearToken in redux

## login success

## 중복제거 - login.tsx

## isolate InputParts

## clearError() 조건을 조금 다른곳에다 둬야할듯

## Signup - 백엔드 api-createAccount 요청 작업 구현

-   result error 적용
-   redirect to home after sign up
-   회원 가입완료 됐다면 login페이지로 username,password,message props를 전달 후 login페이지에서 username,password, message를 이용하여 로그인 폼 및 input에 적절히 값 배치

## darkmode

-   styles폴더 에 관련내용 몰아서 넣어둠

## header layout

-   navigation part 구현

## validate me!

-   지금 저장된 current token이 정말 내 token이 맞는지 확인하는 검증 작업이 필요함
-   useUser.tsx에서 작업함
-   토큰이 변조됐을 경우 강제 로그아웃 시켜준다.

## avartar

-   유저가 로그인된상태라면 header의 오른쪽 상단에 profile아이콘 대신 유저의 avatar 아이콘을 보여준다.

## upload type bug fix

home

-   https://www.apollographql.com/docs/apollo-server/data/file-uploads/

## set basic layout on Home

## feed

## liking photos

-   feed의 photo 부분을 번들링하고 like기능을 추가한다.

## refetching queries (cache)

ex)

```
const [toggleLikeMutation, { loading }] = useMutation(
    TOGGLE_LIKE_MUTATION,
    {
        variables: {
            id
        },
        refetchQueries: [{ query: FEED_QUERY, variables: { id } }]
    }
);
```

-   but 포함된부분이 전부 refetching되기때문에 코스트가 비싸서 작은 단위의 fetching만 refetching 한다.
    (상단의 feed는 큰 단위의 fetch내용이기때문에 캐쉬를 건드리는 방식으로 전환한다.)

## TS(TYPESCRIPT) SETUP for graphql (frontend)

-   apollo 설치
    ref: https://github.com/apollographql/apollo-tooling
    npm install -g apollo

-   create Configuration file
    ref: https://github.com/apollographql/apollo-tooling#configuration
    ref2: https://www.apollographql.com/docs/devtools/apollo-config/
    규칙에따라서 config파일 생성(apollo.config.js)

-   apollo codegen
    ref: https://github.com/apollographql/apollo-tooling#apollo-clientcodegen-output
    Query생성 후

```
apollo client:codegen src/__generated__ --target=typescript --outputFlat
```

을 실행하면 됨(이때 백엔드가 실행되고 있어야한다.)

이 후 \_\_generate\_\_ 폴더에 graphql관련 ts내용이 생성된다..

Home.tsx의 seeFeed, Login.tsx의 loginMutation에 시범 적용완료

-   기존 \_\_generated\_\_폴더를 지우고 다시 생성
-   issue 1
    apollo와 graphql을 둘다 전역설치(-g) 해야지만 실행된다는 말도 있다.(일단 여기선 그런적 없음)

## 쿼리 캐싱 작업 순서

-   refetchingQueries로 일단 해결한다음 나중에 직접 캐시덮어씌우기로 해결해준다.

## cache.writeFragment - graphql 캐싱 방법 part2

```
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
            console.log('now its time to update the cache plz');
        }

        // __typename:id 형식으로 구분한다.
        // __typename의 출처는 __generated__폴더 안에 있다(codegen)
        const photoId = `Photo:${id}`;
        cache.writeFragment({
            id: photoId,
            // fragment BSName on type
            // Photo type의 isLike를 변경할꺼다 라는말
            fragment: gql`
                fragment BSName on Photo {
                    isLiked
                }
            `,
            // 변경하고싶은 데이터를 가져와서 덮어씌운다
            // 이번은 넘겨받은 props의 반전값을 덮어씌운다
            data: {
                isLiked: !isLiked
            }
        });
    }
});
```
