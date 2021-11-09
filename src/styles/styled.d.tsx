// src/assets/styles/styled.d.ts
import 'styled-components';
// 여기 styled theme - typescript 적용

// styled-components안에 있는 DefaultTheme interface를 overwriting 하는 작업이다.
declare module 'styled-components' {
    // DefaultTheme에 대한 interface를 적어두면 DefaultTheme사용시 type정책 사용가능
    export interface DefaultTheme {
        fontColor?: string;
        bgColor?: string;
        accent?: string;
        borderColor?: string;
    }
}
