import {PUT} from "../http/PUT";

export async function updateSuperhero(superheroId: number, superheroData: object){
    return await PUT(`superheroes/${superheroId}`, superheroData);
}