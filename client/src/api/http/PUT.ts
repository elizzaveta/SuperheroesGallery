import {apiBaseUrl} from "../../consts/apiBaseUrl";

export async function PUT(endpoint: string, body:object){
    return await fetch(`${apiBaseUrl}/${endpoint}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response=>{
        if(!response.ok) {
            throw new Error(response.statusText)
        }else{
            return response.json()
        }
    })
}