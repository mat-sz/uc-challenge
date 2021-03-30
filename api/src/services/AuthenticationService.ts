import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../entities/User';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import {
  AuthenticationResponse,
  AuthenticationResponseResult,
} from '../models/AuthenticationResponse';
import { JWTData, AuthenticationStatus } from '../models/JWTData';
import { CreateUserRequest } from '../models/CreateUserRequest';

function validateEmail(str: string) {
  return /\S+@\S+\.\S+/.test(str);
}

function hasNumber(str: string) {
  return /\d/.test(str);
}

function hasLetter(str: string) {
  return /[A-Za-z]/.test(str);
}

function validatePassword(str: string) {
  return hasNumber(str) && hasLetter(str) && str.length >= 8;
}

function validateName(str: string) {
  return str.length >= 5;
}

@Service()
export class AuthenticationService {
  @OrmRepository(User)
  private userRepository: Repository<User>;

  async authenticate(
    request: AuthenticationRequest
  ): Promise<AuthenticationResponse> {
    const user = await this.userRepository.findOne({
      where: { name: request.username },
    });

    if (!user) {
      return {
        result: AuthenticationResponseResult.FAILURE,
      };
    }

    let result = AuthenticationResponseResult.FAILURE;
    let token: string | undefined = undefined;
    let expiresIn: number | undefined = undefined;

    if (await compare(request.password, user.password)) {
      result = AuthenticationResponseResult.SUCCESS;
    }

    if (result === AuthenticationResponseResult.SUCCESS) {
      const data: JWTData = {
        status: AuthenticationStatus.AUTHENTICATED,
        uuid: user.uuid,
        name: user.name,
      };

      expiresIn = parseInt(process.env.JWT_EXPIRY);
      token = sign(data, process.env.JWT_SECRET, {
        expiresIn,
      });
    }

    return {
      result,
      token,
      expiresIn,
    };
  }

  async createUser(
    request: CreateUserRequest
  ): Promise<AuthenticationResponse> {
    if (
      !request ||
      typeof request.email !== 'string' ||
      typeof request.fullName !== 'string' ||
      typeof request.password !== 'string' ||
      typeof request.username !== 'string' ||
      !validateEmail(request.email) ||
      !validateName(request.fullName) ||
      !validatePassword(request.password)
    ) {
      return {
        result: AuthenticationResponseResult.FAILURE,
      };
    }

    const user = this.userRepository.create();
    user.email = request.email;
    user.fullName = request.fullName;
    user.name = request.username;
    user.password = await hash(request.password, 12);
    await this.userRepository.save(user);

    const expiresIn = parseInt(process.env.JWT_EXPIRY);
    const data: JWTData = {
      status: AuthenticationStatus.AUTHENTICATED,
      uuid: user.uuid,
      name: user.name,
    };

    return {
      result: AuthenticationResponseResult.SUCCESS,
      expiresIn,
      token: sign(data, process.env.JWT_SECRET, {
        expiresIn,
      }),
    };
  }
}
