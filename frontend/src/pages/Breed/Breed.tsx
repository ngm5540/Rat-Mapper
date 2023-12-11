import { useEffect, useState } from "preact/hooks";

import { Rat, Sex } from "../../rat";
import { getAllRats } from "../../backend";
import "../../style.css";
import { RatComponent } from "../../components/Rat";

function parent(r: Rat | null, d: string) {
    if (!r) return <p>{d}</p>
    return <RatComponent rat={r}/>
}

export function Breed() {
    const [rats, setRats] = useState<Rat[] | null >();
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

    return (
        <div class="major_component ">
        <h1 class="font-bold text-2xl">Breed</h1>
        <div class="grid grid-rows-2 md:grid-cols-2 grid-flow-row">
            <div class="">
                <h2 class="text-xl">Male</h2>
                <select id="father-select"  class="border-black border-2 rounded-md" onChange={(e: any) => setFather(rats[e.target.value])}>
                    <option value={null}>-</option>
                    {
                        rats?.map((r: Rat, i: number) => {
                            if (r.gender != Sex.MALE) return;
                            return <option value={i}>{r.name}</option>;
                        })
                    }
                </select>
                <p>{parent(father, "...")} </p>
            </div>
            <div class="">
                <h2 class="text-xl">Female</h2>
                <select id="mother-select" class="border-black border-2 rounded-md" onChange={(e: any) => setMother(rats[e.target.value])}>
                    <option value={null}>-</option>
                    {
                        rats?.map((r: Rat, i: number) => {
                            if (r.gender != Sex.FEMALE) return;
                            return <option value={i}>{r.name}</option>;
                        })
                    }
                </select>
                <p>{parent(mother, "...")} </p>
            </div>
        </div>
        </div>
    );
}
