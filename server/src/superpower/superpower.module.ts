import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperpowerEntity } from './superpower.entity';
import { SuperpowerController } from './superpower.controller';
import { SuperpowerService } from './superpower.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperpowerEntity])],
  controllers: [SuperpowerController],
  providers: [SuperpowerService],
})
export class SuperpowerModule {}
