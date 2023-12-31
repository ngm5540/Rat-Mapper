/**
 * The rat family tree.  This isn't an actual tree, but it shows all rats which
 * are stored in the shed.
 *
 * @author Nathan Jankowski (njj3397 [at] rit dot edu)
 **/

import { useEffect, useState } from "preact/hooks";
import { Rat } from "../../rat";
import { getAllRats } from "../../backend";
import "../../style.css";
import { DNAVisualization, RatComponent } from "../../components/Rat";

export default function Tree() {
    const [rats, setRats] = useState<Rat[]>([]);
    const [ratMap, setMap] = useState<Map<number, Rat>>(new Map());
    const [selected, setSelected] = useState<number>(-1);

    // highlight the rat selected with the hash
    useEffect(() => {
        parseHash();
        // change the highlighted rat when the hash changes
        window.addEventListener("hashchange", parseHash);
    }, []);

    // get all rats by ajax
    useEffect(() => {
        getAllRats().then((rats: Response) => {
            console.log(`Got response ${rats.status}`);
            rats.json().then((a) => {
                console.log(`Parsed rats`);
                console.log(a);
                let m = new Map<number, Rat>();
                a.forEach((r: Rat) => m.set(r.id, r));
                setRats(a);
                setMap(m);
            });
        });
    }, []);

    /**
     * function to conditionally display rat names.  If the rat is selected by
     * @link selected, it will appear <mark>ed
     *
     * @param r rat
     * @return how the rat name should be displayed
     **/
    function isHighlightedRat(r: Rat) {
        if (r.id == selected) return <mark>{r.name}</mark>;
        return r.name;
    }

    /**
     * parse the hash from the url and set selected
     **/
    function parseHash() {
        let id = Number(window.location.hash.slice(1));
        setSelected(id);
    }

    return (
        <div class="major_component">
            <h1 class="text-2xl font-bold">Rats</h1>
            <ul>
                {rats.map((r: Rat) => {
                    return (
                        <li id={`${r.id}`} class="py-2">
                            <details>
                                <summary>{isHighlightedRat(r)}</summary>
                                <div class="ml-0 md:ml-6">
                                    <h3 class="font-bold">Parents</h3>
                                    <ul>
                                        <li>
                                            {"Mother: "}
                                            {r.parent_1_id ? (
                                                <a
                                                    class="text-indigo-400 underline"
                                                    href={`#${r.parent_1_id}`}
                                                >
                                                    {
                                                        ratMap.get(
                                                            r.parent_1_id,
                                                        ).name
                                                    }
                                                </a>
                                            ) : (
                                                "No mother"
                                            )}
                                        </li>
                                        <li>
                                            {"Father: "}
                                            {r.parent_2_id ? (
                                                <a
                                                    class="text-indigo-400 underline"
                                                    href={`#${r.parent_2_id}`}
                                                >
                                                    {
                                                        ratMap.get(
                                                            r.parent_2_id,
                                                        ).name
                                                    }
                                                </a>
                                            ) : (
                                                "No father"
                                            )}
                                        </li>
                                    </ul>
                                    <h3 class="font-bold">Traits</h3>
                                    <RatComponent rat={r} ignoreName={true} />
                                    <h3 class="font-bold">Genome</h3>
                                    <DNAVisualization rat={r} />
                                </div>
                            </details>
                        </li>
                    );
                })}
            </ul>
            <a
                class="text-red-500 underline"
                href="mailto:numeric_ladybug786@simplelogin.com"
            >
                Report a rat
            </a>
        </div>
    );
}
