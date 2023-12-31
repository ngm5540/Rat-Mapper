/**
 * various react components for visualizing an @link Rat
 *
 * @author Nathan Jankowski (njj3397 [at] rit [dot] edu)
 **/

import {
    DNAIndexToTrait,
    Rat,
    RatGenome,
    RatProteins,
    earSizeToString,
    eyeColorToString,
    furColorToString,
    hairTypeToString,
    mendelToString,
    ratGenomeToProteins,
    ratToDNA,
    sexToString,
    tailLengthToString,
} from "../rat";

import { Proteins, START_CODON, dnaToCodons } from "../proteins";
import { useEffect, useState } from "preact/hooks";

// props for @link RatComponent
export type RatComponentProps = {
    rat: Rat;
    ignoreName?: boolean;
};
/**
 * Display your rat as a table
 *
 * @param p props for RatComponent; see {@link RatComponentProps}
 */
export function RatComponent(p: RatComponentProps) {
    return (
        <ul>
            {p.ignoreName ? "" : <li>Name: {p.rat.name}</li>}
            <li>
                Fur color: {furColorToString(p.rat.fur_color)} -{" "}
                {p.rat.fur_color}
            </li>
            <li>
                Eye color: {eyeColorToString(p.rat.eye_color)} -{" "}
                {mendelToString(p.rat.eye_color)}
            </li>
            <li>
                Hair type: {hairTypeToString(p.rat.hair)} -{" "}
                {mendelToString(p.rat.hair)}
            </li>
            <li>
                Ear size: {earSizeToString(p.rat.ear_size)} -{" "}
                {mendelToString(p.rat.ear_size)}
            </li>
            <li>
                Tail size: {tailLengthToString(p.rat.tail_size)} -{" "}
                {mendelToString(p.rat.tail_size)}
            </li>
            <li>Sex: {sexToString(p.rat.gender)}</li>
        </ul>
    );
}

// props for @link DNAVisualization
export type DNAVisualizationProps = {
    rat: Rat;
};

/**
 * Display the dna and proteins corresponding with a rat.
 *
 * @param p props @link DNAVisualizationProps
 **/
export function DNAVisualization(p: DNAVisualizationProps) {
    const [ratGenome, setRatGenome] = useState<RatGenome>({
        mG: "",
        pG: "",
        sex: p.rat.gender,
    });
    const [ratProteins, setRatProteins] = useState<RatProteins>({
        genome: ratGenome,
        mG: [],
        pG: [],
    });

    useEffect(() => {
        const dna = ratToDNA(p.rat);
        const proteins = ratGenomeToProteins(dna);
        setRatGenome(dna);
        setRatProteins(proteins);
    }, [p.rat]);

    function getProteinTooltip(arr: Proteins, index: number): string {
        var protein = arr[index];
        if (protein === START_CODON) protein += " (Start)";
        return `${DNAIndexToTrait(index)} - ${protein}`;
    }

    function dna(genome: string, proteins: Proteins) {
        return dnaToCodons(genome).map((item, index) => (
            <div class="codon" title={getProteinTooltip(proteins, index)}>
                {item}
            </div>
        ));
    }

    return (
        <div class="inline-flex flex-col w-full md:w-auto">
            <div class="flex flex-col">
                <div class="flex">
                    <p>5'</p>
                    <p class="ml-auto">3'</p>
                </div>
                <div class="flex flex-row overflow-scroll md:overflow-visible">
                    {dna(ratGenome.mG, ratProteins.mG)}
                </div>
                <p class="text-gray-500 text-sm">Maternal genome</p>
                <div class="flex flex-row overflow-scroll md:overflow-visible">
                    {dna(ratGenome.pG, ratProteins.pG)}
                </div>
                <p class="text-gray-500 text-sm">Paternal genome</p>
            </div>
        </div>
    );
}
