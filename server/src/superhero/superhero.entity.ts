import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { ImageEntity } from '../image/image.entity';
import { SuperpowerEntity } from '../superpower/superpower.entity';

@Entity('Superheros')
export class SuperheroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 56 })
  nickname: string;

  @Column({ type: 'varchar', length: 56 })
  real_name: string;

  @Column({ type: 'varchar', length: 256 })
  origin_description: string;

  @Column({ type: 'varchar', length: 100 })
  catch_phrase: string;

  @ManyToMany(() => SuperpowerEntity)
  @JoinTable()
  superpowers: SuperpowerEntity[];

  @OneToMany(() => ImageEntity, (imageEntity) => imageEntity.superhero)
  images: ImageEntity[];
}
