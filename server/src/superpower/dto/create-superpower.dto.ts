import { IsString } from 'class-validator';

export class CreateSuperpowerDto {
  @IsString()
  name: string;
}
