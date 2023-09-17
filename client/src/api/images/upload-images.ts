import {POST} from "../http/POST";
import {apiBaseUrl} from "../../consts/apiBaseUrl";

export async function uploadImages(images: File[], superheroId: number) {
    const formData = new FormData();
    images.forEach((image, index)=>{
        formData.append(`image${index}`, image);
    });

    return await fetch(`${apiBaseUrl}/images/${superheroId}`, {
        method: "POST",
        body: formData,
    });
}