import { useEffect, useState } from "preact/hooks";

import { Rat } from "../../rat";
import { getAllRats } from "../../backend";

export function Breed() {
    const [rats, setRats] = useState();
    const [newRat, setNewRat] = useState();

    // make ajax call to get new rats
    useEffect(() => {
        getAllRats()
            .then((rats: Response) => {
                console.log(`Got response ${rats.status}`);
                rats.json().then((a) => {
                    console.log(`Got rats`);
                    console.log(a);
                    setRats(a);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1>rat</h1>
        </div>
    );
}
