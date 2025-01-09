import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  private async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
  }

  async create(user: Partial<User>): Promise<User> {
    const emailTaken = await this.emailExists(user.email);
    if (emailTaken) {
      throw new ConflictException('Email is already in use');
    }

    const maxIdUser = await this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'DESC')
      .getOne();

    const newId = maxIdUser ? maxIdUser.id + 1 : 1;

    const newUser = this.userRepository.create({
      ...user,
      id: newId,
    });

    return await this.userRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found for deletion`);
    }

    return {
      success: true,
      message: `User with id ${id} has been deleted successfully`,
    };
  }
}
