import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../entities/User';

@Service()
export class UserService {
  @OrmRepository(User)
  private userRepository: Repository<User>;

  async byId(id: number) {
    return await this.userRepository.findOne(id);
  }

  async byUuid(uuid: string) {
    return await this.userRepository.findOne({ where: { uuid: uuid } });
  }

  async byName(name: string) {
    return await this.userRepository.findOne({ where: { name: name } });
  }

  async all() {
    return await this.userRepository.find();
  }

  async add(name: string, fullName: string, email: string, password: string) {
    const user = new User();
    user.fullName = fullName;
    user.name = name;
    user.email = email;
    user.password = await hash(password, 12);
    await this.userRepository.save(user);
    return user;
  }

  async remove(user: User) {
    await this.userRepository.remove(user);
  }

  async save(user: User) {
    await this.userRepository.save(user);
  }
}
