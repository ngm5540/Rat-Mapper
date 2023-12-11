import { useState, useEffect } from "preact/hooks";
import {
    DNAIndexToTrait,
    MI,
    Rat,
    RatGenome,
    RatProteins,
    Sex,
    ratGenomeToProteins,
    ratToDNA,
} from "../../rat";
import "./style.css";
import { Proteins, START_CODON, dnaToCodons } from "../../proteins";
import { postRat } from "../../backend";
import { DNAVisualization } from "../../components/Rat";

export enum EyeColor {
    BLACK,
    RED,
}

export enum HairType {
    WIRE,
    SMOOTH,
}

export enum TailLength {
    LONG,
    SHORT,
}

export enum EarSize {
    SMALL,
    MEDIUM,
    LARGE,
}

// the 37 enums for @link Rat
export enum FurColor {
    BLACK, // "BB" or "Br"
    WHITE, // "WW" or "Wr"
    DALMATION, // "BW"
    ORANGE, // "rr"
}

export function furColorToCross(f: FurColor): string {
    var gen: string;
    switch (f) {
        case FurColor.BLACK:
            if (Math.random() < 0.5) {
                gen = "BB";
            } else {
                if (Math.random() < 0.5) gen = "Br";
                else gen = "rB";
            }
            break;
        case FurColor.WHITE:
            if (Math.random() < 0.5) {
                gen = "WW";
            } else {
                if (Math.random() < 0.5) gen = "Wr";
                else gen = "rW";
            }
            break;
        case FurColor.DALMATION:
            if (Math.random() < 0.5) gen = "BW";
            else gen = "WB";
            break;
        case FurColor.ORANGE:
            gen = "rr";
            break;
        default:
            console.error("No such fur color!");
            break;
    }
    return gen;
}

export function earSizeToCross(e: EarSize): MI {
    var m: MI;
    switch (e) {
        case EarSize.LARGE:
            m = MI.HOM_DOM;
            break;
        case EarSize.MEDIUM:
            if (Math.random() < 0.5) m = MI.HET_DOM_M;
            else m = MI.HET_DOM_P;
            break;
        case EarSize.SMALL:
            m = MI.REC;
            break;
        default:
            console.error("no such ear size!");
            break;
    }
    return m;
}

export function randDom() {
    const r = Math.random();
    if (r < 0.333) {
        return MI.HOM_DOM;
    }
    if (r > 0.333 && r < 0.666) {
        return MI.HET_DOM_M;
    }
    return MI.HET_DOM_P;
}

/**
 * @param v value of enum
 * @param dom value of dominant
 * @param rec value of recessive
 **/
export function mendelToCross(v: number, dom: number, rec: number): MI {
    var m: MI;
    if (v === dom) m = randDom();
    else if (v === rec) m = MI.REC;
    else console.error(`trait ${v} is neither dominant or recessive`);
    return m;
}

export function eyeColorToCross(e: EyeColor): MI {
    return mendelToCross(e, EyeColor.BLACK, EyeColor.RED);
}

export function hairTypeToCross(h: HairType) {
    return mendelToCross(h, HairType.WIRE, HairType.SMOOTH);
}

export function tailLengthToCross(t: TailLength) {
    return mendelToCross(t, TailLength.LONG, TailLength.SHORT);
}

export default function Home() {
    const [rat, setRat] = useState<Rat>({
        id: null,
        name: "",
        fur_color: furColorToCross(FurColor.BLACK),
        eye_color: eyeColorToCross(EyeColor.BLACK),
        hair: hairTypeToCross(HairType.WIRE),
        tail_size: tailLengthToCross(TailLength.LONG),
        ear_size: earSizeToCross(EarSize.LARGE),
        parent_1_id: null,
        parent_2_id: null,
        gender: Sex.MALE,
    });
    const [ratGenome, setRatGenome] = useState<RatGenome>({
        mG: "",
        pG: "",
    } as RatGenome);
    const [ratProteins, setRatProteins] = useState<RatProteins>(
        {} as RatProteins,
    );

    useEffect(ratDidChange, [rat]);

    /**
     * parse an event and return the value as a number
     **/
    function parseEv(e: any): any {
        return Number(e.target.value);
    }

    function handleChangeFur(f: FurColor) {
        setRat({
            ...rat,
            fur_color: furColorToCross(f),
        });
    }

    function handleChangeEye(e: EyeColor) {
        setRat({
            ...rat,
            eye_color: eyeColorToCross(e),
        });
    }

    function handleChangeHair(h: HairType) {
        setRat({
            ...rat,
            hair: hairTypeToCross(h),
        });
    }

    function handleChangeTail(t: TailLength) {
        setRat({
            ...rat,
            tail_size: tailLengthToCross(t),
        });
    }

    function handleChangeEar(e: EarSize) {
        setRat({
            ...rat,
            ear_size: earSizeToCross(e),
        });
    }

    function handleChangeSex(s: Sex) {
        // trans rights 🏳️‍⚧️
        setRat({
            ...rat,
            gender: s,
        });
    }

    function handleChangeName(n: string) {
        setRat({
            ...rat,
            name: n,
        });
    }

    function ratDidChange() {
        console.log(`Rat: ${JSON.stringify(rat)}`);
        const dna = ratToDNA(rat);
        const proteins = ratGenomeToProteins(dna);
        setRatGenome(dna);
        setRatProteins(proteins);
    }

    return (
        <div class="home major_component">
            <h1 class="text-2xl font-bold">Create your rat</h1>
            <div class="space-y-4 ml-6">
                <div class="rat_question">
                    <label for="fur-color">Fur Color</label>
                    <select
                        name="fur-color"
                        class="rat_question"
                        onChange={(e: any) => handleChangeFur(parseEv(e))}
                    >
                        <option value={FurColor.BLACK}>Black</option>
                        <option value={FurColor.WHITE}>White</option>
                        <option value={FurColor.DALMATION}>Dalmation</option>
                        <option value={FurColor.ORANGE}>Orange 🐅</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="eye-color">Eye Color</label>
                    <select
                        name="eye-color"
                        class="rat_question"
                        onChange={(e: any) => handleChangeEye(parseEv(e))}
                    >
                        <option value={EyeColor.BLACK}>Black</option>
                        <option value={EyeColor.RED}>Red</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="hair-type">Hair Type</label>
                    <select
                        name="hair-type"
                        class="rat_question"
                        onChange={(e: any) => handleChangeHair(parseEv(e))}
                    >
                        <option value={HairType.WIRE}>Wire</option>
                        <option value={HairType.SMOOTH}>Smooth</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="tail-length">Tail Length</label>
                    <select
                        name="tail-length"
                        class="rat_question"
                        onChange={(e: any) => handleChangeTail(parseEv(e))}
                    >
                        <option value={TailLength.LONG}>Long</option>
                        <option value={TailLength.SHORT}>Short</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="ear-size">Ear Size</label>
                    <select
                        name="ear-size"
                        class="rat_question"
                        onChange={(e: any) => handleChangeEar(parseEv(e))}
                    >
                        <option value={EarSize.LARGE}>Large</option>
                        <option value={EarSize.MEDIUM}>Medium</option>
                        <option value={EarSize.SMALL}>Small</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="sex">Sex</label>
                    <select
                        name="sex"
                        class="rat_question"
                        onChange={(e: any) => handleChangeSex(parseEv(e))}
                    >
                        <option value={Sex.MALE}>Male</option>
                        <option value={Sex.FEMALE}>Female</option>
                    </select>
                </div>
            </div>
            <DNAVisualization genome={ratGenome} proteins={ratProteins} />
            <div class="mt-4 space-x-2">
                <label for="rat-name">Name your rat:</label>
                <input
                    class="border-2 rounded-md border-black dark:border-indigo-600"
                    onInput={(e: any) => handleChangeName(e.target.value)}
                ></input>
                <button
                    class="bg-indigo-500 disabled:bg-gray-500 hover:bg-indigo-700 text-white rounded-md ml-auto w-32 h-8"
                    disabled={!rat.name}
                    onClick={() => {
                        postRat(rat).then((value: Response) => {
                            console.log(`Got response! ${value.status}`);
                            // location.reload();
                        });
                    }}
                >
                    Send to shed
                </button>
            </div>
        </div>
    );
}
