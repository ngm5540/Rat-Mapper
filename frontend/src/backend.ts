/**
 * Helper functions for interfacing with backend server.
 *
 * @author Nathan Jankowski (njj3397 [at] rit dot edu)
 **/

import { Rat } from "./rat";

// TODO is there a better way of storing this
// TODO ssl would be nice but ultimately not essential
const BACKEND_URL = "http://ratmapper.student.rit.edu:5000";
const HEADERS = {
    "Content-Type": "application/json",
};

/**
 * send a rat to the backend
 *
 * @param rat rat to send
 * @return a promise for the request (so you can .then and whatnot)
 **/
export function postRat(rat: Rat): Promise<Response> {
    console.log("posting this rat");
    console.log(rat);
    return fetch(`${BACKEND_URL}/save`, {
        method: "POST",
        body: JSON.stringify(rat),
        headers: HEADERS,
    });
}

/**
 * Get all rats from the backend
 *
 * @return a promise for a response containing an array of rats (so you can .then and whatnot)
 **/
export async function getAllRats(): Promise<Response> {
    return fetch(`${BACKEND_URL}/all`, {
        method: "GET",
    });
}
