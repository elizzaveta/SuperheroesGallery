import {SuperpowerType} from "./Superpower.type";
import {ImageType} from "./Image.type";

export type SuperheroType = {
    id: number,
    nickname: string,
    real_name: string,
    origin_description: string,
    catch_phrase: string,
    superpowers: SuperpowerType[],
    images: ImageType[]
}