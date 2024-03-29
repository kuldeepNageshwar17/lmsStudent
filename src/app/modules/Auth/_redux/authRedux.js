import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken,LogoutUser} from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  getUserData : 'getUserData',
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  logoutRequested:"[[unload User] Auht logout API]",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "v706-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        console.log(authToken)
        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user ,authToken} = action.payload;
        return { ...state, user , authToken };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logoutRequested: () => ({ type: actionTypes.logoutRequested }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
 // requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser:( user ,authToken) => ({ type: actionTypes.UserLoaded, payload: { user ,authToken } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    debugger;
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });


  yield takeLatest(actionTypes.logoutRequested, function* logoutSaga() {
    debugger
    LogoutUser();
    yield put(actions.logout());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    debugger;
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });


  yield takeLatest(actionTypes.getUserData, function* getUser(action) {
    debugger
    const {authToken }  = action.payload
    const { data: user } = yield getUserByToken(authToken);
    debugger
    yield put(actions.fulfillUser(user ,authToken));
    console.log("auth" , authToken , user)
  });
}
