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

/**
 * The characteristics for a rat that we're tracking
 **/
export interface Rat {
    furColor: FurColor;
    eyeColor: EyeColor;
    hairType: HairType;
    tailLength: TailLength;
    earSize: EarSize;
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

// the 37 enums for @link Rat
export enum FurColor {
    BLACK,
    WHITE,
    DALMATION,
    ORANGE,
}

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

export enum Sex {
    MALE,
    FEMALE,
}

/**
 * Mendellian inheritance schemes
 **/
enum MI {
    HOM_DOM, // homozygous dominant
    HET_DOM, // heterozygous dominant
    REC, // recessive
}

/**
 * the javascript equivilant of flipping a coin to simulate genetic randomness
 *
 * See @link ratToProtein
 **/
function randBool() {
    return Math.random() < 0.5;
}

/**
 * get a random type of mendellian dominance
 **/
function randDom() {
    if (randBool()) {
        return MI.HET_DOM;
    } else {
        return MI.HOM_DOM;
    }
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
        case MI.HET_DOM:
            if (randBool()) {
                // rg.mG gets dominant
                rg.mG += domProtein;
                rg.pG += recProtein;
            } else {
                rg.mG += recProtein;
                rg.pG += domProtein;
            }
            break;
        case MI.REC:
            rg.mG += recProtein;
            rg.pG += recProtein;
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

    const blackFur = constructProteinDNA(DNAMap.get("His"));
    const whiteFur = constructProteinDNA(DNAMap.get("Thr"));
    const recFur = constructProteinDNA(DNAMap.get("Lys"));
    switch (r.furColor) {
        // an example of codominance
        case FurColor.BLACK:
            // BB or Br
            if (randBool()) {
                // homozygous
                g.mG += blackFur;
                g.pG += blackFur;
                break;
            }
            if (randBool()) {
                // maternal gets dominant gene
                g.mG += blackFur;
                g.pG += recFur;
            } else {
                g.mG += recFur;
                g.pG += blackFur;
            }
            break;
        case FurColor.WHITE:
            // WW or Wr
            if (randBool()) {
                // homozygous
                g.mG += whiteFur;
                g.pG += whiteFur;
                break;
            }
            if (randBool()) {
                // maternal gets dominant gene
                g.mG += whiteFur;
                g.pG += recFur;
            } else {
                g.mG += recFur;
                g.pG += whiteFur;
            }
            break;
        case FurColor.DALMATION:
            // BW
            if (randBool()) {
                // maternal is black
                g.mG += blackFur;
                g.pG += whiteFur;
            } else {
                g.mG += whiteFur;
                g.pG += blackFur;
            }
            break;
        case FurColor.ORANGE:
            // rr
            g.mG += recFur;
            g.mG += recFur;
            break;
    }

    var mEyes: MI;
    switch (r.eyeColor) {
        case EyeColor.BLACK:
            mEyes = randDom();
            break;
        case EyeColor.RED:
            mEyes = MI.REC;
            break;
    }
    mendel(g, DNAMap.get("Ser"), DNAMap.get("Leu"), mEyes);

    var mHair: MI;
    switch (r.hairType) {
        case HairType.WIRE:
            mHair = randDom();
            break;
        case HairType.SMOOTH:
            mHair = MI.REC;
            break;
    }
    mendel(g, DNAMap.get("Asp"), DNAMap.get("Glu"), mHair);

    var mTail: MI;
    switch (r.tailLength) {
        case TailLength.LONG:
            mTail = randDom();
            break;
        case TailLength.SHORT:
            mTail = MI.REC;
            break;
    }
    mendel(g, DNAMap.get("Cys"), DNAMap.get("Tyr"), mTail);

    var mEar: MI;
    switch (r.earSize) {
        case EarSize.SMALL:
            mEar = MI.REC;
            break;
        case EarSize.MEDIUM:
            mEar = MI.HET_DOM;
            break;
        case EarSize.LARGE:
            mEar = MI.HOM_DOM;
            break;
    }
    // even though incomplete dominance is non-mendellian the genetic distribution
    // still follows the same algorithm
    mendel(g, DNAMap.get("Phe"), DNAMap.get("Ile"), mEar);

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
