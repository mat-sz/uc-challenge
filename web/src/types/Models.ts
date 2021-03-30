import { ActionType } from './ActionType';

export interface ActionModel {
  type: ActionType;
  value: any;
}

export interface AuthenticationUpdate {
  authenticated: boolean;
  username?: string;
  fullName?: string;
  token?: string;
}

export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export enum AuthenticationResponseResult {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface AuthenticationResponse {
  result: AuthenticationResponseResult;
  token?: string;
  expiresIn?: number;
}

export interface User {
  fullName: string;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  fullName?: string;
  username?: string;
}
