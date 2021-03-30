import { ActionType } from '../types/ActionType';
import { ActionModel, AuthenticationUpdate } from '../types/Models';

export function updateAuthenticationState(
  update: AuthenticationUpdate
): ActionModel {
  return {
    type: ActionType.UPDATE_AUTHENTICATION_STATE,
    value: update,
  };
}

export function updateLoadingState(loading: boolean): ActionModel {
  return {
    type: ActionType.UPDATE_LOADING_STATE,
    value: loading,
  };
}
