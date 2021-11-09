import { makeVar } from '@apollo/client';
import { DARK_MODE } from './constance';

export const isLoggedInVar = makeVar(false);

// darkMode의 상태를 위한 reactive variable
// darkmode설정이 localstorage에 존재하면 true 아니라면 false로 초기화
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
