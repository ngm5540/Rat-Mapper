/**
 * General functions for working with proteins and DNA/RNA.
 * The code here isn't exactly pretty but I did my best.  Genetics
 * is hard.
 *
 * @author Nathan Jankowski (njj3397 <at> rit . edu)
 **/

/**
 * Mapping of Protein ->  DNA we're using for this project.
 * DNA is redundant, but for simplicity it makes sense to decide
 * which codons correspond to which proteins
 **/
export const DNAMap = new Map([
    ["Start", reverseTranscriptase("AUG")],
    ["Stop", reverseTranscriptase("UAG")],
    ["His", reverseTranscriptase("CAU")],
    ["Thr", reverseTranscriptase("ACC")],
    ["Lys", reverseTranscriptase("AAG")],
    ["Ser", reverseTranscriptase("AGU")],
    ["Leu", reverseTranscriptase("CUA")],
    ["Asp", reverseTranscriptase("GAC")],
    ["Glu", reverseTranscriptase("GAA")],
    ["Cys", reverseTranscriptase("UGU")],
    ["Tyr", reverseTranscriptase("UAC")],
    ["Phe", reverseTranscriptase("UUC")],
    ["Ile", reverseTranscriptase("AUA")],
]);

/** Protein corresponding to the start codon */
export const START_CODON = ribosome(rnaPolymerase(DNAMap.get("Start")));
/** Protein corresponding to the stop codon */
export const STOP_CODON = ribosome(rnaPolymerase(DNAMap.get("Stop")));
/** Regular expression of valid nucleotides */
export const RNA_RE = /^[ACGU]+$/;

/** Type alias for Genome */
export type Proteins = string[][];
export type Genome = string;

/**
 * Return type for {@link validateDNA}.
 **/
export type DNAValidationResult = {
    /** true if dna is valid */
    isValid: boolean;
    /** reason why dna is invalid */
    reason: string;
};

/**
 * Ensures a string of DNA is valid.
 *
 * @param dna strand of dna
 * @returns @link DNAValidationResult
 **/
export function validateDNA(dna: string): DNAValidationResult {
    // TODO this doesn't actually check that every start codon has a stop codon;
    // just that the whole string starts/ends with a start & stop codon
    const rna = rnaPolymerase(dna);
    var result = {} as DNAValidationResult;

    if (!RNA_RE.test(rna)) {
        result.isValid = false;
        result.reason = "Strand contains invalid characters!";
        return result;
    }
    if (rna.length % 3 != 0) {
        result.isValid = false;
        result.reason =
            "DNA has incomplete codons (length is not divisible by 3)";
        return result;
    }
    if (rna.slice(0, 3) != START_CODON) {
        result.isValid = false;
        result.reason = "rna does not start with the start codon";
        return result;
    }

    if (rna.slice(-4, -1) != STOP_CODON) {
        result.isValid = false;
        result.reason = "Strand does not end with a stop codon";
        return result;
    }

    result.isValid = true;
    return result;
}

/**
 * Encode a DNA strand into proteins.<br>
 * This function does no validation. To ensure the dna is a valid snippet
 * use @link validateDNA
 *
 * @param dna strand of DNA.
 * @returns an array of arrays containing protein strands
 **/
export function encodeDNA(dna: string): string[][] {
    var parsed = [];
    var proteinIndex = -1;
    for (
        var i = { start: 0, end: 3 };
        i.end < dna.length;
        i.start = i.end, i.end += 3
    ) {
        const codon = dna.slice(i.start, i.end);
        const protein = ribosome(rnaPolymerase(codon));
        if (protein === null) {
            return null;
        }
        if (protein === START_CODON) {
            parsed.push([]);
            proteinIndex++;
        }
        parsed[proteinIndex].push(protein);
    }

    return parsed;
}

/**
 * Creates a valid protein by surrounding @param protein with valid start/stop
 * codons
 **/
export function constructProtein(protein: string[]) {
    var r = [];
    r.push(START_CODON);
    r = r.concat(protein);
    r.push(STOP_CODON);
    return r;
}

/**
 * Creates a DNA strand which codes for a valid protein by surrounding
 * the @param codons snippet with start/stop proteins
 **/
export function constructProteinDNA(codons: string) {
    return DNAMap.get("Start") + codons + DNAMap.get("Stop");
}

/**
 * Convert a strand of DNA into a strand of RNA by replacing thymine with uracil
 **/
export function rnaPolymerase(dna: string): string {
    return dna.toUpperCase().replace("T", "U");
}

/**
 * Convert a strand of RNA into a single-stranded DNA segment
 **/
export function reverseTranscriptase(rna: string): string {
    return rna.toUpperCase().replace("U", "T");
}

/**
 * Convert a codon into the corresponding protein
 *
 * @param codon string of length 3 with valid RNA nucleotides (case insensitive)
 * @returns a string of the corresponding protein (or null if the string is invalid)
 **/
export function ribosome(codon: string): string {
    codon = codon.toUpperCase();

    switch (codon) {
        case "UUU":
        case "UUC":
            return "Phe";
        case "UUA":
        case "UUG":
            return "Leu";

        case "CUU":
        case "CUC":
        case "CUA":
        case "CUG":
            return "Leu";

        case "AUU":
        case "AUC":
        case "AUA":
            return "Ile";
        case "AUG":
            return "Met"; // Start codon!

        case "GUU":
        case "GUC":
        case "GUA":
        case "GUG":
            return "Val";

        case "UCU":
        case "UCC":
        case "UCA":
        case "UCG":
            return "Ser";

        case "CCU":
        case "CCC":
        case "CCA":
        case "CCG":
            return "Pro";

        case "ACU":
        case "ACC":
        case "ACA":
        case "ACG":
            return "Thr";

        case "GCU":
        case "GCC":
        case "GCA":
        case "GCG":
            return "Ala";

        case "UAU":
        case "UAC":
            return "Tyr";
        case "UAA":
        case "UAG":
            return "Stop"; // stop codon

        case "CAU":
        case "CAC":
            return "His";
        case "CAA":
        case "CAG":
            return "Gln";

        case "AAU":
        case "AAC":
            return "Asn";
        case "AAA":
        case "AAG":
            return "Lys";

        case "GAU":
        case "GAC":
            return "Asp";
        case "GAA":
        case "GAG":
            return "Glu";

        case "UGU":
        case "UGC":
            return "Cys";
        case "UGA":
            return "Stop";
        case "UGG":
            return "Trp";

        case "CGU":
        case "CGC":
        case "CGA":
        case "CGG":
            return "Arg";

        case "AGU":
        case "AGC":
            return "Ser";
        case "AGA":
        case "AGG":
            return "Arg";

        case "GGU":
        case "GGC":
        case "GGA":
        case "GGG":
            return "Gly";

        default:
            return null;
    }
}
