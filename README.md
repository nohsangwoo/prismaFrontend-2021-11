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
