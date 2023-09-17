import {apiBaseUrl} from "../../consts/apiBaseUrl";

export async function GET(endpoint: string) {
    return await fetch(`${apiBaseUrl}/${endpoint}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        }).catch((e)=>{
            console.log(e)
        })
}