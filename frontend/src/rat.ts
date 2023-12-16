/**
 * Code responsible for representing rat traits and translating them to DNA/Proteins.
 * Anything in this file has absolutely crossed the threshold from
 * "sensible programming" to "spaghetti code" because genetics is
 * complicated and javascript handles classes very strangely, which makes
 * proper encapsulation impossible (to my knowledge).
 *
 * If you're reading this I'm sorry.
 *
 * @author Nathan Jankowski (njj3397 {at} rit dot edu)
 **/
import {
    DNAMap,
    Genome,
    Proteins,
    constructProteinDNA,
    encodeDNA,
} from "./proteins";

/**
 * sex of rats
 **/
export enum Sex {
    MALE,
    FEMALE,
}

/**
 * Mendellian inheritance schemes
 **/
export enum MI {
    HOM_DOM, // homozygous dominant
    HET_DOM_M, // heterozygous dominant maternal
    HET_DOM_P, // heterozygous dominant paternal
    REC, // recessive
}

/**
 * The characteristics for a rat that we're tracking
 **/
export interface Rat {
    id: number | null;
    name: string;
    fur_color: string;
    eye_color: MI;
    hair: MI;
    ear_size: MI;
    tail_size: MI;
    parent_1_id: number | null;
    parent_2_id: number | null;
    gender: Sex;
}

/**
 * the requisite information to transfer a rat genome
 * genomeA and genomeB are identical in structure, but contain different genes,
 * to represent the fact that rats are diploid creatures.  The format of a
 * genome is as follows:
 * [ hair color, eye color, hair type, tail length, ear size]
 *
 * Each gene is represented as a full protein with a start and stop codon.
 *
 * Sex is not represented in the genome in this model, but it is still tracked.
 **/
export interface RatGenome {
    mG: Genome; // maternal genome
    pG: Genome; // paternal genome
    sex: Sex;
}

/**
 * Interface for representing a rat genome as proteins. @see Ratgenome
 **/
export interface RatProteins {
    genome: RatGenome;
    mG: Proteins;
    pG: Proteins;
}

/**
 * A helper function to do mendellian inheritance for me
 *
 * @param mg maternal genome
 * @param pg paternal genome
 * @param dom dominant protein
 * @param rec recessive protein
 * @param m mendellian inheritance mode
 **/
function mendel(rg: RatGenome, dom: string, rec: string, m: MI) {
    const domProtein = constructProteinDNA(dom);
    const recProtein = constructProteinDNA(rec);
    switch (Number(m)) {
        case MI.HOM_DOM:
            rg.mG += domProtein;
            rg.pG += domProtein;
            break;
        case MI.HET_DOM_M:
            rg.mG += domProtein;
            rg.pG += recProtein;
            break;
        case MI.HET_DOM_P:
            rg.mG += recProtein;
            rg.pG += domProtein;
            break;
        case MI.REC:
            rg.mG += recProtein;
            rg.pG += recProtein;
            break;
        default:
            console.error("Not a valid inheritance method!");
            break;
    }
}

/**
 * Convert a rat into it's consitituient DNA
 *
 * @param rat rat to convert
 * @returns an array of strings matching proteins
 **/
export function ratToDNA(r: Rat): RatGenome {
    var g = {} as RatGenome;
    g.mG = "";
    g.pG = "";
    g.sex = r.gender;

    const blackFur = constructProteinDNA(DNAMap.get("His"));
    const whiteFur = constructProteinDNA(DNAMap.get("Thr"));
    const recFur = constructProteinDNA(DNAMap.get("Lys"));
    switch (r.fur_color[0]) {
        case "B":
            g.mG += blackFur;
            break;
        case "W":
            g.mG += whiteFur;
            break;
        case "r":
            g.mG += recFur;
            break;
        default:
            console.error(`no such genotype ${r.fur_color}`);
            break;
    }
    switch (r.fur_color[1]) {
        case "B":
            g.pG += blackFur;
            break;
        case "W":
            g.pG += whiteFur;
            break;
        case "r":
            g.pG += recFur;
            break;
        default:
            console.error(`no such genotype ${r.fur_color}`);
            break;
    }

    mendel(g, DNAMap.get("Ser"), DNAMap.get("Leu"), r.eye_color);
    mendel(g, DNAMap.get("Asp"), DNAMap.get("Glu"), r.hair);
    mendel(g, DNAMap.get("Cys"), DNAMap.get("Tyr"), r.tail_size);
    // even though incomplete dominance is non-mendellian the genetic distribution
    // still follows the same algorithm
    mendel(g, DNAMap.get("Phe"), DNAMap.get("Ile"), r.ear_size);

    return g;
}

/**
 * Convert an @link RatGenome to @link RatProteins
 **/
export function ratGenomeToProteins(rg: RatGenome): RatProteins {
    var rp = {} as RatProteins;
    rp.genome = rg;
    rp.mG = encodeDNA(rg.mG);
    rp.pG = encodeDNA(rg.pG);

    return rp;
}

/** Simulate meiosis for any trait which follows a mendellian inheritance pattern */
function mendelMeiosis(pG: MI, mG: MI): MI {
    function m2s(m: MI) {
        switch (Number(m)) {
            case MI.HOM_DOM:
                return "DD";
            case MI.HET_DOM_M:
                return "Dd";
            case MI.HET_DOM_P:
                return "dD";
            case MI.REC:
                return "dd";
            default:
                console.error("que");
        }
    }

    let m = m2s(mG)[Math.random() < 0.5 ? 0 : 1];
    let p = m2s(pG)[Math.random() < 0.5 ? 0 : 1];
    switch (m + p) {
        case "DD":
            return MI.HOM_DOM;
        case "Dd":
            return MI.HET_DOM_M;
        case "dD":
            return MI.HET_DOM_P;
        case "dd":
            return MI.REC;
        default:
            console.error("que");
    }
}

/**
 * Simulate meiosis for the fur color trait
 **/
function furColorMeiosis(mG: string, pG: string) {
    let m = mG[Math.random() < 0.5 ? 0 : 1];
    let p = pG[Math.random() < 0.5 ? 0 : 1];

    return m + p;
}

/**
 * simulate meiosis with the genomes of two rats
 *
 * @param m mother
 * @param p father
 * @return the potential child genome
 */
export function meiosis(m: Rat, f: Rat): Rat {
    return {
        name: "",
        fur_color: furColorMeiosis(m.fur_color, f.fur_color),
        eye_color: mendelMeiosis(m.eye_color, f.eye_color),
        hair: mendelMeiosis(m.hair, f.hair),
        ear_size: mendelMeiosis(m.ear_size, f.ear_size),
        tail_size: mendelMeiosis(m.tail_size, f.tail_size),
        gender: Math.random() < 0.5 ? Sex.FEMALE : Sex.MALE,
        id: null,
        parent_1_id: m.id,
        parent_2_id: f.id,
    };
}

/**
 * correlates the index of proteins or codons from a rat genome to traits.
 * I couldn't think of a way to automate this, so it's all just magic numbers.  sorry.
 *
 * @param i index of the array
 * @return string representing what the trait is
 **/
export function DNAIndexToTrait(i: number): string {
    if (i >= 0 && i < 3) {
        return "Fur color";
    }
    if (i >= 3 && i < 6) {
        return "Eye color";
    }
    if (i >= 6 && i < 9) {
        return "Hair type";
    }
    if (i >= 9 && i < 12) {
        return "Tail length";
    }
    if (i >= 12 && i < 15) {
        return "Ear size";
    }
    return "";
}

export function furColorToString(f: string) {
    // this is code i am actually embarrassed about writing.  sorry.
    if (f[0] === "r" && f[1] === "r") return "orange";
    if (f[0] === "B" && f[1] === "W") return "dalmation";
    if (f[0] === "W" && f[1] === "B") return "dalmation";
    if (f[0] === "B" && f[1] !== "W") return "black";
    if (f[1] === "B" && f[0] !== "W") return "black";
    if (f[0] === "W" && f[1] !== "B") return "white";
    if (f[1] === "W" && f[0] !== "B") return "white";
}

export function mendelToString(m: MI) {
    switch (Number(m)) {
        case MI.HOM_DOM:
            return "homozygous dominant";
        case MI.HET_DOM_M:
        case MI.HET_DOM_P:
            return "heterozygous dominant";
        case MI.REC:
            return "recessive";
    }
}
export function eyeColorToString(m: MI) {
    switch (Number(m)) {
        case MI.HOM_DOM:
        case MI.HET_DOM_M:
        case MI.HET_DOM_P:
            return "black";
        case MI.REC:
            return "red";
    }
}

export function hairTypeToString(m: MI) {
    switch (Number(m)) {
        case MI.HOM_DOM:
        case MI.HET_DOM_M:
        case MI.HET_DOM_P:
            return "wirey";
        case MI.REC:
            return "smooth";
    }
}

export function tailLengthToString(m: MI) {
    switch (Number(m)) {
        case MI.HOM_DOM:
        case MI.HET_DOM_M:
        case MI.HET_DOM_P:
            return "long";
        case MI.REC:
            return "short";
    }
}

export function earSizeToString(m: MI) {
    switch (Number(m)) {
        case MI.HOM_DOM:
            return "large";
        case MI.HET_DOM_M:
        case MI.HET_DOM_P:
            return "medium";
        case MI.REC:
            return "small";
    }
}

export function sexToString(s: Sex) {
    switch (Number(s)) {
        case Sex.MALE:
            return "male";
        case Sex.FEMALE:
            return "female";
    }
}
