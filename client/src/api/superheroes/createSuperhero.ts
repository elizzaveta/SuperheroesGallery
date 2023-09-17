import {POST} from "../http/POST";

export async function createSuperhero(superhero: any) {
    return await POST(`superheroes`, superhero);
}