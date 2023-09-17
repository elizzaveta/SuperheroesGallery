import {apiBaseUrl} from "../../consts/apiBaseUrl";

export async function DELETE(endpoint: string, body?: object) {
    return await fetch(`${apiBaseUrl}/${endpoint}`, {
        method: 'Delete',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong.')
        } else {
            return response.json();
        }
    })
}