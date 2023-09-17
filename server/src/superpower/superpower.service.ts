import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperpowerEntity } from './superpower.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SuperpowerService {
  constructor(
    @InjectRepository(SuperpowerEntity)
    private superpowerRepository: Repository<SuperpowerEntity>,
  ) {}

  async getAll(): Promise<SuperpowerEntity[]> {
    return await this.superpowerRepository.find();
  }

  async create(name: string): Promise<SuperpowerEntity> {
    const newSuperpower: SuperpowerEntity = new SuperpowerEntity();
    newSuperpower.name = name;
    return await this.superpowerRepository.save(newSuperpower);
  }

  async getByIdArray(superpowersIds: number[]): Promise<SuperpowerEntity[]> {
    return await this.superpowerRepository.find({
      where: { id: In(superpowersIds) },
    });
  }
}
