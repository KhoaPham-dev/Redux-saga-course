import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
  select,
  take,
} from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";
function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: result.data.data,
      })
    );
  } catch (error) {
    yield put(actions.handleError(error));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}
function* createUser(action) {
  try {
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    });
    yield call(getUsers);
  } catch (error) {
    yield put(actions.handleError(error));
  }
}
function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USERS_REQUEST, createUser);
}
function* deleteUser(userId) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (error) {
    yield put(actions.handleError({ error: error.message }));
  }
}
function* watchDeleteUserRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_USERS_REQUEST);
    yield call(deleteUser, payload.userId);
  }
}
const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

export default usersSagas;
