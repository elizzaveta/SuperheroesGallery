import { IsArray, IsNumber, IsString } from 'class-validator';

export class SuperheroDto {
  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsString()
  catch_phrase: string;

  @IsArray()
  @IsNumber({}, { each: true })
  superpowersIds: number[];
}
