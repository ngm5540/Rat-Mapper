/**
 * Code responsible for representing rat traits and translating them to DNA/Proteins.
 * Anything in this file has absolutely crossed the threshold from
 * "sensible programming" to "spaghetti code" because genetics is
 * complicated and I'm not a web developer so I don't know how to sensibly
 * structure typescript code.
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
    switch (m) {
        case MI.HOM_DOM:
            rg.mG += domProtein;
            rg.pG += recProtein;
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
