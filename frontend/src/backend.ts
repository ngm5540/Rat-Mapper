import { Rat } from "./rat";

const BACKEND_URL = "http://localhost:8080";

export function postRat(rat: Rat) {
    return fetch(`${BACKEND_URL}/save`, {
        method: "POST",
        body: JSON.stringify(rat),
    });
}
