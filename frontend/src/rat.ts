import { Genome, START_CODON, constructProtein } from "./proteins";

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
    const domProtein = constructProtein([dom]);
    const recProtein = constructProtein([rec]);
    switch (m) {
        case MI.HOM_DOM:
            rg.mG.push(domProtein);
            rg.pG.push(recProtein);
            break;
        case MI.HET_DOM:
            if (randBool()) {
                // rg.mG gets dominant
                rg.mG.push(domProtein);
                rg.pG.push(recProtein);
            } else {
                rg.mG.push(recProtein);
                rg.pG.push(domProtein);
            }
            break;
        case MI.REC:
            rg.mG.push(recProtein);
            rg.pG.push(recProtein);
            break;
    }
}

/**
 * Convert a rat into it's consitituient proteins
 *
 * @param rat rat to convert
 *  @returns an array of strings matching proteins
 **/
export function ratToProtein(r: Rat): RatGenome {
    var g = {} as RatGenome;

    const blackFur = constructProtein(["His"]);
    const whiteFur = constructProtein(["Thr"]);
    const recFur = constructProtein(["Lys"]);
    switch (r.furColor) {
        case FurColor.BLACK:
            // BB or Br
            if (randBool()) {
                // homozygous
                g.mG.push(blackFur);
                g.pG.push(blackFur);
                break;
            }
            if (randBool()) {
                // maternal gets dominant gene
                g.mG.push(blackFur);
                g.pG.push(recFur);
            } else {
                g.mG.push(recFur);
                g.pG.push(blackFur);
            }
            break;
        case FurColor.WHITE:
            // WW or Wr
            if (randBool()) {
                // homozygous
                g.mG.push(whiteFur);
                g.pG.push(whiteFur);
                break;
            }
            if (randBool()) {
                // maternal gets dominant gene
                g.mG.push(whiteFur);
                g.pG.push(recFur);
            } else {
                g.mG.push(recFur);
                g.pG.push(whiteFur);
            }
            break;
        case FurColor.DALMATION:
            // BW
            if (randBool()) {
                // maternal is black
                g.mG.push(blackFur);
                g.pG.push(whiteFur);
            } else {
                g.mG.push(whiteFur);
                g.pG.push(blackFur);
            }
            break;
        case FurColor.ORANGE:
            // rr
            g.mG.push(recFur);
            g.mG.push(recFur);
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
    mendel(g, "Ser", "Leu", mEyes);

    var mHair: MI;
    switch (r.hairType) {
        case HairType.WIRE:
            mHair = randDom();
            break;
        case HairType.SMOOTH:
            mHair = MI.REC;
            break;
    }
    mendel(g, "Asp", "Glu", mHair);

    var mTail: MI;
    switch (r.tailLength) {
        case TailLength.LONG:
            mTail = randDom();
            break;
        case TailLength.SHORT:
            mTail = MI.REC;
            break;
    }
    mendel(g, "Cys", "Tyr", mTail);

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
    // even though this is non-mendellian in practice it still follows the same
    // algorithm
    mendel(g, "Phe", "Ile", mEar);

    return g;
}
