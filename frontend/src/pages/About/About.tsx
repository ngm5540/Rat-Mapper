/**
 * A simple about page
 *
 * @author Nathan Jankowski (njj3397 at rit dot edu)
 **/
import { DNAMap, START_CODON } from "../../proteins";
import "../../style.css";

// display a mendellian trait
function mendelTrait(
    name: string,
    dom: string,
    domProtein: string,
    rec: string,
    recProtein: string,
) {
    return (
        <div>
            <h3 class="text-lg">{name} - Mendellian</h3>
            <p>
                {dom} (dominant): {domProtein} (DNA: {DNAMap.get(domProtein)})
            </p>
            <p>
                {rec} (recessive): {recProtein} (DNA: {DNAMap.get(recProtein)})
            </p>
        </div>
    );
}
export function About() {
    return (
        <div class="major_component">
            <h1 class="text-2xl">About</h1>
            <p class="mb-2">
                Rat mapper is a project to simulate a rat genome to investigate
                the relationship between phenotypic traits and genotypes. To do
                this, we created a simplified "simulated" rat genome, which
                encodes for a select number of phenotypic traits. This allowed
                us to learn more about how DNA, proteins, and physical traits
                relate.
                <br/>
                The source code is available on{" "}
                <a class="text-indigo-700 underline"
                   href="https://github.com/ngm5540/Rat-Mapper">Github</a>.
                <br />
            </p>
            <h2 class="text-xl">Traits</h2>
            <p class="italic">
                Note: all traits start with start codon {START_CODON} and end
                with a stop codon, as this is needed so ribosomes know where to
                start and stop. This is omitted in the list below for brevity.
            </p>
            <ul>
                <li>
                    <div>
                        <h3 class="text-lg">Fur color - Codominance</h3>
                        <p>Black (dominant): His (DNA: {DNAMap.get("His")})</p>
                        <p>White (dominant): Thr (DNA: {DNAMap.get("Thr")})</p>
                        <p>
                            No pigment (recessive): Lys (DNA:{" "}
                            {DNAMap.get("Lys")})
                        </p>
                        <p>
                            Orange is recessive/recessive, Black/White
                            codominance is Dalmation
                        </p>
                    </div>
                </li>
                <li>
                    {mendelTrait("Eye color", "Black", "Ser", "Red", "Leu")}
                </li>
                <li>
                    {mendelTrait("Hair type", "Wirey", "Asp", "Smooth", "Glu")}
                </li>
                <li>
                    {mendelTrait("Tail length", "Long", "Cys", "Short", "Tyr")}
                </li>
                <li>
                    <div>
                        <h3 class="text-lg">Ear size - Incomplete dominance</h3>
                        <p>Dominant: Phe (DNA: {DNAMap.get("Phe")})</p>
                        <p>Recessive: Ile (DNA: {DNAMap.get("Ile")})</p>
                        <p>Large: EE, Medium: Ee, Small: ee</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}
