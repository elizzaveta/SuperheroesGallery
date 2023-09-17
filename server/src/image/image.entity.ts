import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SuperheroEntity } from '../superhero/superhero.entity';

@Entity('Images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SuperheroEntity, (superheroEntity) => superheroEntity.images)
  superhero: SuperheroEntity;

  @Column({
    type: 'bytea',
    transformer: {
      from: (base64Image: Buffer) =>
        base64Image ? base64Image.toString('base64') : null,
      to: (base64String: string) => Buffer.from(base64String, 'base64'),
    },
  })
  base64Image: Buffer;
}
