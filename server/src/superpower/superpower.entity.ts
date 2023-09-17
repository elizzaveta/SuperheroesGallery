import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SuperheroEntity } from '../superhero/superhero.entity';

@Entity('Superpowers')
export class SuperpowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  name: string;

  @ManyToMany(
    () => SuperheroEntity,
    (superheroEntity) => superheroEntity.superpowers,
  )
  superheros: SuperheroEntity[];
}
