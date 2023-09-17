import {DELETE} from "../http/DELETE";

export async function deleteImagesById(imagesIds: number[]){
    return await DELETE(`images`, imagesIds);
}