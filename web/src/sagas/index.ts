import { put, takeEvery, select, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  updateAuthenticationState,
  updateLoadingState,
} from '../actions/state';
import { ActionType } from '../types/ActionType';
import {
  ActionModel,
  AuthenticationRequest,
  AuthenticationResponse,
  AuthenticationResponseResult,
  AuthenticationState,
  CreateUserRequest,
} from '../types/Models';

function* updateUserData(token: string) {
  const res: AuthenticationState = yield call(async () => {
    const res = await fetch('/api/v1/authentication', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return await res.json();
  });

  if (res.isAuthenticated) {
    toast.success('Done!');
  }

  yield put(
    updateAuthenticationState({
      authenticated: res.isAuthenticated,
      fullName: res.fullName,
      username: res.username,
      token: res.isAuthenticated ? token : undefined,
    })
  );
}

function* signIn(action: ActionModel) {
  const data = action.value as AuthenticationRequest;
  if (!data.username || !data.password) {
    toast.error('Invalid username or password.');
    return;
  }

  yield put(updateLoadingState(true));

  const res: AuthenticationResponse = yield call(async () => {
    const res = await fetch('/api/v1/authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  });

  yield put(updateLoadingState(false));

  if (
    !res.result ||
    res.result !== AuthenticationResponseResult.SUCCESS ||
    !res.token
  ) {
    toast.error('Invalid username or password.');
    return;
  }

  yield updateUserData(res.token);
}

function* signUp(action: ActionModel) {
  console.log('signup');
  const data = action.value as CreateUserRequest;
  if (!data.username || !data.password || !data.fullName || !data.email) {
    toast.error('Invalid data.');
    return;
  }

  yield put(updateLoadingState(true));

  const res: AuthenticationResponse = yield call(async () => {
    const res = await fetch('/api/v1/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  });

  yield put(updateLoadingState(false));

  if (
    !res.result ||
    res.result !== AuthenticationResponseResult.SUCCESS ||
    !res.token
  ) {
    toast.error('Invalid data.');
    return;
  }

  yield updateUserData(res.token);
}

function* signOut() {
  yield updateAuthenticationState({
    authenticated: false,
  });
}

export function* root() {
  yield takeEvery(ActionType.SIGN_IN, signIn);
  yield takeEvery(ActionType.SIGN_UP, signUp);
  yield takeEvery(ActionType.SIGN_OUT, signOut);
}
