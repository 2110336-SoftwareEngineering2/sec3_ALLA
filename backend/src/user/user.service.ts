import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { Student } from 'src/entities/student.entity';
import { Employer } from 'src/entities/employer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Employer) private readonly employeRepo: Repository<Employer>,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ username });
  }

  async create(dto: Omit<User, 'id'>): Promise<User> {
    const password = await hash(dto.password, 10);
    const user = { ...new User(), ...dto, password };
    return this.userRepo.save(user);
  }

  async update(id: number, dto: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = { ...(await this.findById(id)), ...dto };
    if (dto.password) {
      user.password = await hash(dto.password, 10);
    }
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
    return user;
  }
}
