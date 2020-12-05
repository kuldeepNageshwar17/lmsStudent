import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/newauthModule/_redux/authRedux";


export const rootReducer = combineReducers({
  User = auth.UserReducer,
  Student = auth.StudentReducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
