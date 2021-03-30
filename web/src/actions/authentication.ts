import { ActionType } from '../types/ActionType';
import {
  ActionModel,
  AuthenticationRequest,
  CreateUserRequest,
} from '../types/Models';

export function signIn(username: string, password: string): ActionModel {
  return {
    type: ActionType.SIGN_IN,
    value: { username, password } as AuthenticationRequest,
  };
}

export function signUp(
  username: string,
  password: string,
  fullName: string,
  email: string
): ActionModel {
  return {
    type: ActionType.SIGN_UP,
    value: { username, password, fullName, email } as CreateUserRequest,
  };
}

export function signOut(): ActionModel {
  return {
    type: ActionType.SIGN_OUT,
    value: null,
  };
}
