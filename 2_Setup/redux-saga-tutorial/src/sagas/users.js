import { takeEvery, call, fork, put, select } from "redux-saga/effects";
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
    console.log(yield select((state) => state));
  } catch (error) {}
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const usersSagas = [fork(watchGetUsersRequest)];

export default usersSagas;
