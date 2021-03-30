import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { JWTData, AuthenticationStatus } from './models/JWTData';

export function getJWTData(req: Request): JWTData | undefined {
  if (!req.headers['authorization']) {
    return;
  }

  const split = req.headers['authorization'].split(' ');
  const token = split[split.length - 1];

  try {
    const data = verify(token, process.env.JWT_SECRET);

    if (typeof data === 'object') {
      return data as JWTData;
    }
  } catch {}
}

export function isAuthenticated(jwtData: JWTData) {
  return (
    jwtData &&
    jwtData.uuid &&
    jwtData.status === AuthenticationStatus.AUTHENTICATED
  );
}

export function hasUserData(jwtData: JWTData) {
  return (
    jwtData &&
    jwtData.uuid &&
    jwtData.status === AuthenticationStatus.AUTHENTICATED
  );
}
