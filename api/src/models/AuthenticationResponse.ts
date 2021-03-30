export enum AuthenticationResponseResult {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface AuthenticationResponse {
  result: AuthenticationResponseResult;
  token?: string;
  expiresIn?: number;
}
