import {GET} from "../http/GET";

export async function getAllSuperheroes(page?: number) {
    return await GET(`superheroes${page ? `?page=${page}` : ``}`);
}