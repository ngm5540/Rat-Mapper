/**
 * Transcribe a DNA string into RNA
 *
 * @param dna string of dna
 * @return rna string
 **/

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
 * @throws InvalidDNAError
 **/
export function validateDNA(dna: string): DNAValidationResult {
    const START_CODON = ribosome("AUG");
    const STOP_CODON = ribosome("UAG");
    const RNA_RE = /^[ACGU]+$/;

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
 * This function does no validation.  To ensure the dna is a valid snippet
 *
 * @param dna strand of DNA.
 **/
export function encodeDNA(dna: string): string[] {
    var parsed = [];
    for (
        var i = { start: 0, end: 3 };
        i.end < dna.length;
        i.start = i.end, i.end += 3
    ) {
        const codon = dna.slice(i.start, i.end);
        const protein = ribosome(rnaPolymerase(codon));
        if (protein != null) {
            parsed.push(codon);
        } else {
            return null;
        }
    }

    return parsed;
}

export function rnaPolymerase(dna: string): string {
    return dna.toUpperCase().replace("T", "U");
}

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
