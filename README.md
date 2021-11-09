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
