import { START_CODON } from "./proteins";

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
    maternalGenome: string[];
    paternalGenome: string[];
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
 * Mendellian inheritance schemes
 **/
enum MI {
    HOM_DOM, // homozygous dominant
    HET_DOM, // heterozygous dominant
    REC, // recessive
}
// type alias because I am NOT typing this out

/**
 * A helper function to do mendellian inheritance for me
 *
 * @param mg maternal genome
 * @param pg paternal genome
 * @param dom dominant protein
 * @param rec recessive protein
 * @param m mendellian inheritance mode
 **/
function mendel(mg: string[], pg: string[], dom: string, rec: string, m: MI) {
    switch (m) {
        case MI.HOM_DOM:
            mg.push(dom);
            pg.push(dom);
            break;
        case MI.HET_DOM:
            if (randBool()) {
                // mg gets dominant
                mg.push(dom);
                pg.push(rec);
            } else {
                mg.push(rec);
                pg.push(dom);
            }
            break;
        case MI.REC:
            mg.push(rec);
            pg.push(rec);
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
    switch (r.furColor) {
        case FurColor.BLACK:
            if (randBool()) {
                g.maternalGenome.push("His"); // dominant black
                g.paternalGenome.push("Lys"); // recessive white
            } else {
                g.maternalGenome.push("Lys");
                g.paternalGenome.push("His");
            }
            break;
        case FurColor.WHITE:
            if (randBool()) {
                g.maternalGenome.push("Thr"); // dominant
                g.paternalGenome.push("Asn");
            } else {
                g.maternalGenome.push("Asn");
                g.paternalGenome.push("Thr");
            }
            break;
        case FurColor.ORANGE:
            // picking some recessive genes for this
            g.maternalGenome.push("Asn");
            g.paternalGenome.push("Lys");
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
    mendel(g.maternalGenome, g.paternalGenome, "Ser", "Leu", mEyes);

    var mHair: MI;
    switch (r.hairType) {
        case HairType.WIRE:
            mHair = randDom();
            break;
        case HairType.SMOOTH:
            mHair = MI.REC;
            break;
    }
    mendel(g.maternalGenome, g.paternalGenome, "Asp", "Glu", mHair);

    var mTail: MI;
    switch (r.tailLength) {
        case TailLength.LONG:
            mTail = randDom();
            break;
        case TailLength.SHORT:
            mTail = MI.REC;
            break;
    }
    mendel(g.maternalGenome, g.paternalGenome, "Cys", "Tyr", mTail);

    switch (r.earSize) {
        case EarSize.SMALL:
            break;
        case EarSize.MEDIUM:
            break;
        case EarSize.LARGE:
            break;
    }

    return g;
}
