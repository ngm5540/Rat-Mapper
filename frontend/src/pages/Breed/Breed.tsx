import { useEffect, useState } from "preact/hooks";

import { Rat, Sex, meiosis } from "../../rat";
import { getAllRats } from "../../backend";
import "../../style.css";
import { RatComponent } from "../../components/Rat";

function displayRat(r: Rat | null, d: string) {
    if (!r) return <p>{d}</p>;
    return <RatComponent rat={r} />;
}

export function Breed() {
    const [rats, setRats] = useState<Rat[] | null>();
    const [mother, setMother] = useState<Rat | null>(null);
    const [father, setFather] = useState<Rat | null>(null);
    const [child, setChild] = useState<Rat | null>(null);
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

    useEffect(() => {
        if (!mother || !father) return;
        calculateChild();
    }, [mother, father]);

    function calculateChild() {
        setChild(meiosis(mother, father));
    }

    return (
        <div class="major_component ">
            <h1 class="font-bold text-2xl">Breed</h1>
            <div class="grid grid-rows-2 md:grid-cols-2 grid-flow-row">
                <div class="">
                    <h2 class="text-xl">Male</h2>
                    <select
                        id="father-select"
                        class="border-black border-2 rounded-md"
                        onChange={(e: any) => setFather(rats[e.target.value])}
                    >
                        <option value={null}>-</option>
                        {rats?.map((r: Rat, i: number) => {
                            if (r.gender != Sex.MALE) return;
                            return <option value={i}>{r.name}</option>;
                        })}
                    </select>
                    <p>{displayRat(father, "...")} </p>
                </div>
                <div class="">
                    <h2 class="text-xl">Female</h2>
                    <select
                        id="mother-select"
                        class="border-black border-2 rounded-md"
                        onChange={(e: any) => setMother(rats[e.target.value])}
                    >
                        <option value={null}>-</option>
                        {rats?.map((r: Rat, i: number) => {
                            if (r.gender != Sex.FEMALE) return;
                            return <option value={i}>{r.name}</option>;
                        })}
                    </select>
                    <p>{displayRat(mother, "...")} </p>
                </div>
            </div>
            <div>
                <h3 class="text-lg">Child</h3>
                <button
                    class="bg-indigo-500 text-white border-2 rounded-md p-1"
                    onClick={calculateChild}
                    hidden={mother === null || father === null}
                >
                    Reroll
                </button>
                {displayRat(child, "...")}
            </div>
        </div>
    );
}
