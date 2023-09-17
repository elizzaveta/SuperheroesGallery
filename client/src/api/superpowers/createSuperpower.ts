import {POST} from "../http/POST";

export async function createSuperpower(name: string) {
    return await POST(`superpowers`, {name: name});
}