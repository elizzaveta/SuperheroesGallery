import {DELETE} from "../http/DELETE";

export async function deleteSuperhero(superheroId: number) {
    return await DELETE(`superheroes/${superheroId}`);
}