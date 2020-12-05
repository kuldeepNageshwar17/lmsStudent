import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken, getStudentByToken  , LogoutUser ,LogoutStudent} from "./authCrud";

const initialAuthStateUser = {
  user: undefined,
  isInstituteUser:false,
  userPermission:[],
  authToken: undefined,
  currentBranch:null,
  branches:[],
  controlPanelStatus:false
};

const initialAuthStateStudent = {
  user: undefined,
  authToken: undefined
};

export const actionTypes = {

  User_Register: "USER_REGISTER",
  User_Login: "USER_LOGIN",
  User_Requested : 'USER_REQUESTED',
  User_Loaded: "USER_LOADED",
  User_Logout: "USER_LOGOUT",
  ChangeControlPanelStatus:"CHANGE_CONTROL_PANEL_STATUS",

  Student_Login : 'STUDENT_LOGIN',
  Student_Requested : 'STUDENT_REQUESTED',
  Student_Loaded: "STUDENT_LOADED",
  Student_Logout: "STUDENT_LOGOUT",

};

export const StudentReducer = persistReducer(
  { storage, key: "v706-demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthStateStudent, action) => {
    switch (action.type) {
      case actionTypes.Student_Login: {
        const { authToken } = action.payload;
        return { authToken, user: undefined };
      }
      case actionTypes.Student_Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      case actionTypes.Student_Loaded: {
        const { user } = action.payload;
        return { ...state, user };
      }
      default:
        return state
    }
  }
);
export const UserReducer = persistReducer(
  { storage, key: "v706-demo1-auth", whitelist: ["user", "authToken","currentBranch","branches","controlPanelStatus","isInstituteUser","userPermission"] },
  (state = initialAuthStateUser, action) => {
    switch (action.type) {
      
      case actionTypes.User_Register: {
        const message = action.payload;
        return {  ...state, user: undefined };
      }
      case actionTypes.User_Login: {
        const { authToken } = action.payload;
        return { ...state, authToken, user: undefined };
      }
      case actionTypes.User_Loaded: {
        const { user } = action.payload;
        debugger;
        var  instituteAdmin= user.roles.filter(u=> u.type===1)
        var isInstituteUser=instituteAdmin.length?true:false;
        return { ...state, user,userPermission:user.permission,branches:user.branches,currentBranch:user.branch,isInstituteUser};
      }
      case actionTypes.User_Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }
      case actionTypes.ChangeControlPanelStatus: {
        debugger;
        const { status } = action.payload;
        return { ...state,controlPanelStatus:status};
      }
      default:
        return state
    }
  }
);


//saga 


export const actions = {
  registerUser: message => ({type: actionTypes.User_Register,payload: { message }}),
  // userLogin: authToken => ({ type: actionTypes.User_Login, payload: { authToken } }),
  requestUser: user => ({ type: actionTypes.User_Requested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.User_Loaded, payload: { user } }),
  userLogout: user => ({ type: actionTypes.User_Logout}),
  // ChangeControlPanelStatus:status=>({type: actionTypes.ChangeControlPanelStatus,payload:{status}}),

  // studentlogin: authToken => ({ type: actionTypes.Student_Login, payload: { authToken } }),
  requestStudent: user => ({ type: actionTypes.Student_Requested, payload: { user } }),
  fulfillStudent: user => ({ type: actionTypes.STUDENT_Loaded, payload: { user } }),
  Studentlogout: () => ({ type: actionTypes.STUDENT_Logout })
};

export function* saga() {
  yield takeLatest('USER_REGISTER_REQUESTED', function* registerSaga(action) {
    yield put(actions.registerUser(action.payload.message))
  });

  yield takeLatest('USER_LOGIN_REQUESTED', function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest('USER_REQUESTED', function* userRequested() {
    const { data: user } = yield getUserByToken();
    yield put(actions.fulfillUser(user));
  });

  yield takeLatest('USER_LOGOUT_REQUESTED', function*  UserLogout() {
    debugger;
    LogoutUser();
    yield put(actions.userLogout());
  });

  ////////////////////////////////////////////////////////////////////////////////
  yield takeLatest('STUDENT_LOGIN_REQUESTED', function* loginSaga() {
    yield put(actions.requestStudent());
  });

  yield takeLatest('STUDENT_REQUESTED', function* userRequested() {
    const { data: user } = yield getStudentByToken();
    yield put(actions.fulfillStudent(user));
  });

  yield takeLatest('STUDENT_LOGOUT_REQUESTED', function*  UserLogout() {
    debugger;
    LogoutStudent();
    yield put(actions.Studentlogout());
  });
}


