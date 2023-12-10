import { Rat } from "./rat";

const BACKEND_URL = "http://127.0.0.1:5000";
const HEADERS = {
    "Content-Type": "application/json",
};

export function postRat(rat: Rat): Promise<Response> {
    return fetch(`${BACKEND_URL}/save`, {
        method: "POST",
        body: JSON.stringify(rat),
        headers: HEADERS,
    });
}

export async function getAllRats(): Promise<Response> {
    fetch(`${BACKEND_URL}/all`, {
        method: "GET",
        headers: HEADERS,
    })
        .then((rats: Response) => {
            console.log(`Got response ${rats.status}`);
            rats.json().then((a) => {
                console.log(a);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}
