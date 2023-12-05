import { Rat } from "./rat";

const BACKEND_URL = "http://localhost:5000";

export function postRat(rat: Rat) {
    return fetch(`${BACKEND_URL}/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rat),
    });
}
