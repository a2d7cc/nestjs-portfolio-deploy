import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}



  async findAll(searchTerm?: string): Promise<User[]> {
    let users;
    if(searchTerm) {
      users = this.userRepository.findBy({
        email: ILike(`%${searchTerm}%`)
      })
    } else {
      users = await this.userRepository.find()
    }

    return users;

  }

  async count() {
    return await this.userRepository.findAndCount()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({id})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id})
    return this.userRepository.save({...user, ...updateUserDto})
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({id})
    return this.userRepository.remove(user)
  }
}
