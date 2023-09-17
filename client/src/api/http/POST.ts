import {apiBaseUrl} from "../../consts/apiBaseUrl";

export async function POST(endpoint: string, body?: object) {
    return await fetch(`${apiBaseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        })
        .catch(e => {
            console.log(e);
        });
}
