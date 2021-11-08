import { all, call } from "redux-saga/effects";
import { counterSaga } from "./sagaCounter";
import { initSaga } from "./sagaInit";
import { getMyStreamSaga } from "./getMyStream";
import { getMyDevicesSaga } from "./getMyDevices";

// saga를 모아주는 combineReducers같은 기능
export default function* rootSaga() {
  yield all([
    call(counterSaga),
    call(initSaga),
    call(getMyStreamSaga),
    call(getMyDevicesSaga)
  ]);
}
