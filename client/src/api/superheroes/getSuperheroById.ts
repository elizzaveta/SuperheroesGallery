import {GET} from "../http/GET";

export async function getSuperheroById(id: number) {
    return await GET(`superheroes/${id}`);
}