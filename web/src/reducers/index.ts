import { Store } from 'redux';
import { ActionType } from '../types/ActionType';
import { ActionModel, AuthenticationUpdate } from '../types/Models';

export interface StateType {
  authenticated: boolean;
  loading: boolean;
  username?: string;
  fullName?: string;
  token?: string;
}

let initialState: StateType = {
  authenticated: false,
  loading: false,
};

export type StoreType = Store<StateType, ActionModel>;

export function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.UPDATE_AUTHENTICATION_STATE:
      const update = action.value as AuthenticationUpdate;
      newState.authenticated = update.authenticated;
      newState.username = update.username;
      newState.fullName = update.fullName;
      newState.token = update.token;
      break;
    case ActionType.UPDATE_LOADING_STATE:
      newState.loading = action.value as boolean;
      break;
    default:
      return state;
  }

  return newState;
}
