import { Inject } from 'typedi';
import { JsonController, Body, Put } from 'routing-controllers';

import { AuthenticationService } from '../services/AuthenticationService';
import { CreateUserRequest } from '../models/CreateUserRequest';

@JsonController('/api/v1/user')
export class UserController {
  @Inject()
  private authenticationService: AuthenticationService;

  @Put('/')
  async create(@Body() request: CreateUserRequest) {
    return await this.authenticationService.createUser(request);
  }
}
