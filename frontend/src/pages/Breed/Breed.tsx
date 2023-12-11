import { useEffect, useState } from "preact/hooks";

import { Rat, Sex, meiosis } from "../../rat";
import { getAllRats, postRat } from "../../backend";
import "../../style.css";
import { DNAVisualization, RatComponent } from "../../components/Rat";

function displayRat(r: Rat | null, d: string) {
    if (!r) return <p>{d}</p>;
    return <RatComponent rat={r} />;
}

function displayChild(r: Rat | null, d: string) {
    if (!r) return <p>{d}</p>;
    return (
        <div>
            <RatComponent rat={r} />
            <DNAVisualization rat={r} />
        </div>
    );
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
        let name = "";
        if (child) name = child.name;
        let newChild = meiosis(mother, father);
        newChild.name = name;
        setChild(newChild);
    }

    function submitChild() {
        if (!child) return;

        postRat(child).then((value: Response) => {
            console.log(`Got response! ${value.status}`);
            location.reload();
        });
    }

    function handleName(name: string) {
        if (child)
            setChild({
                ...child,
                name: name,
            });
    }

    return (
        <div class="major_component ">
            <h1 class="font-bold text-2xl">Breed</h1>
            <div class="grid grid-rows-2 grid-cols-auto md:grid-cols-2 grid-flow-row gap-x-4">
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
                <div>
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
                <div class="col-span-2">
                    <label class="text-lg">Child </label>
                    <input
                        class="border-black border-2 rounded-md"
                        onInput={(e: any) => handleName(e.target.value)}
                        hidden={!child}
                    />
                    <button
                        class="bg-indigo-500 text-white border-2 rounded-md p-1"
                        onClick={calculateChild}
                        hidden={!child}
                    >
                        Retry
                    </button>
                    <button
                        class="bg-indigo-500 disabled:bg-gray-500 hover:bg-indigo-700 text-white rounded-md ml-auto w-32 h-8"
                        onClick={submitChild}
                        hidden={!child}
                        disabled={!child || child.name == ""}
                    >
                        Send to shed
                    </button>

                    {displayChild(child, "")}
                </div>
            </div>
        </div>
    );
}
