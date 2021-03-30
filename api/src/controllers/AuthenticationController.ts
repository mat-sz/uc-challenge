import { Inject } from 'typedi';
import {
  JsonController,
  Get,
  Post,
  Body,
  CurrentUser,
  Put,
  OnUndefined,
} from 'routing-controllers';

import { AuthenticationService } from '../services/AuthenticationService';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { User } from '../entities/User';

@JsonController('/api/v1/authentication')
export class AuthenticationController {
  @Inject()
  private authenticationService: AuthenticationService;

  @Get('/')
  async index(@CurrentUser() user?: User) {
    return {
      isAuthenticated: !!user,
      username: user?.name,
      fullName: user?.fullName,
    };
  }

  @Post('/')
  @OnUndefined(500)
  async authenticate(@Body() authenticationRequest: AuthenticationRequest) {
    return await this.authenticationService.authenticate(authenticationRequest);
  }
}
