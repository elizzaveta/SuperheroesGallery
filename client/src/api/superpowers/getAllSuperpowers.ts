import {GET} from "../http/GET";

export async function getAllSuperpowers() {
    return await GET(`superpowers`);
}