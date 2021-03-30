export enum AuthenticationStatus {
  AUTHENTICATED = 'authenticated',
  NOT_AUTHENTICATED = 'not_authenticated',
}

export interface JWTData {
  uuid: string;
  name: string;
  status: AuthenticationStatus;
}
