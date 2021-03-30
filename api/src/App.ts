import 'reflect-metadata';
import {
  useContainer as useContainerRC,
  Action,
  createExpressServer,
} from 'routing-controllers';
import { createConnection, useContainer as useContainerTO } from 'typeorm';
import { Container } from 'typedi';

import { AuthenticationController } from './controllers/AuthenticationController';
import { UserController } from './controllers/UserController';

import { ErrorHandler } from './middlewares/ErrorHandler';
import { getJWTData, isAuthenticated, hasUserData } from './Authentication';
import { UserService } from './services/UserService';

export default async function App(ormconfig: any) {
  useContainerTO(Container);
  useContainerRC(Container);

  try {
    await createConnection(ormconfig);

    const app = createExpressServer({
      cors: true,
      controllers: [AuthenticationController, UserController],
      middlewares: [ErrorHandler],
      defaultErrorHandler: false,
      authorizationChecker: async (action: Action) =>
        isAuthenticated(getJWTData(action.request)),
      currentUserChecker: async (action: Action) => {
        const jwtData = getJWTData(action.request);

        if (!hasUserData(jwtData)) {
          return undefined;
        }

        const userService = Container.get(UserService);
        return await userService.byUuid(jwtData.uuid);
      },
    });

    const port = process.env.HTTP_PORT || 4000;
    const ip = process.env.HTTP_IP || '127.0.0.1';
    app.listen(port, ip);

    console.log('api listening on: ' + ip + ':' + port);
  } catch (e) {
    console.error(e);
  }
}
