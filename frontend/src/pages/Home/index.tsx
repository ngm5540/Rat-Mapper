import { Component } from "preact";
import {
    EarSize,
    EyeColor,
    FurColor,
    HairType,
    Rat,
    RatGenome,
    RatProteins,
    Sex,
    TailLength,
    indexToTrait,
    ratGenomeToProteins,
    ratToDNA,
} from "../../rat";
import "./style.css";
import { Proteins, START_CODON, dnaToCodons } from "../../proteins";
import { postRat } from "../../backend";

type HomeProps = {};
type HomeState = {
    rat: Rat;
    ratGenome: RatGenome;
    ratProteins: RatProteins;
};
export class Home extends Component<HomeProps, HomeState> {
    constructor() {
        super();
        this.state = {
            rat: {} as Rat,
            ratGenome: { mG: "", pG: "" } as RatGenome,
            ratProteins: {} as RatProteins,
        };
    }

    componentDidMount() {
        // initialize rat to default state
        this.updateRat({
            id: -1,
            name: "",
            fur_color: FurColor.BLACK,
            eye_color: EyeColor.BLACK,
            hair: HairType.WIRE,
            tail_size: TailLength.LONG,
            ear_size: EarSize.LARGE,
            parent_1_id: -1,
            parent_2_id: -1,
            gender: Sex.MALE,
        });
    }

    getMutState(): HomeState {
        return structuredClone(this.state);
    }

    getRat() {
        var state: HomeState = this.getMutState();
        return state.rat;
    }

    updateRat(r: Rat) {
        console.log(`Rat: ${JSON.stringify(r)}`);
        var s: HomeState = this.getMutState();
        s.rat = r;
        s.ratGenome = ratToDNA(r);
        s.ratProteins = ratGenomeToProteins(s.ratGenome);

        this.setState(s);
        console.log(`New state:`);
        console.log(s);
    }

    getProteinTooltip(arr: Proteins, index: number): string {
        var protein = arr[index];
        if (protein === START_CODON) protein += " (Start)";
        return `${indexToTrait(index)} - ${protein}`;
    }

    render() {
        return (
            <div class="home major_component">
                <h1 class="text-2xl font-bold">Create your rat</h1>
                <div class="space-y-4 ml-6">
                    <div class="rat_question">
                        <label for="fur-color">Fur Color</label>
                        <select
                            name="fur-color"
                            class="rat_question"
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.fur_color = Number(e.target.value);
                                this.updateRat(rat);
                            }}
                        >
                            <option value={FurColor.BLACK}>Black</option>
                            <option value={FurColor.WHITE}>White</option>
                            <option value={FurColor.DALMATION}>Grey</option>
                            <option value={FurColor.ORANGE}>Orange 🐅</option>
                        </select>
                    </div>
                    <div class="rat_question">
                        <label for="eye-color">Eye Color</label>
                        <select
                            name="eye-color"
                            class="rat_question"
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.eye_color = Number(e.target.value);
                                this.updateRat(rat);
                            }}
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
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.hair = Number(e.target.value);
                                this.updateRat(rat);
                            }}
                        >
                            <option value={HairType.WIRE}>Wire</option>
                            <option value={HairType.SMOOTH}>Smooth</option>
                        </select>
                    </div>
                    <div class="rat_question">
                        <label for="tail-length">Hair Type</label>
                        <select
                            name="tail-length"
                            class="rat_question"
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.tail_size = Number(e.target.value);
                                this.updateRat(rat);
                            }}
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
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.ear_size = Number(e.target.value);
                                this.updateRat(rat);
                            }}
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
                            onChange={(e: any) => {
                                var rat = this.getRat();
                                rat.gender = e.target.value;
                                this.updateRat(rat);
                            }}
                        >
                            <option value={Sex.MALE}>Male</option>
                            <option value={Sex.FEMALE}>Female</option>
                        </select>
                    </div>
                    <div class="inline-flex flex-col">
                        <div class="flex flex-col">
                            <div class="flex">
                                <p>5'</p>
                                <p class="ml-auto">3'</p>
                            </div>
                            <div class="flex flex-row">
                                {dnaToCodons(this.state.ratGenome.mG).map(
                                    (item, index) => (
                                        <div
                                            class="codon"
                                            title={this.getProteinTooltip(
                                                this.state.ratProteins.pG,
                                                index,
                                            )}
                                        >
                                            {item}
                                        </div>
                                    ),
                                )}
                            </div>
                            <label class="text-gray-500 text-sm">
                                Maternal genome
                            </label>
                            <div class="flex flex-row">
                                {dnaToCodons(this.state.ratGenome.pG).map(
                                    (item, index) => (
                                        <div
                                            class="codon"
                                            title={this.getProteinTooltip(
                                                this.state.ratProteins.pG,
                                                index,
                                            )}
                                        >
                                            {item}
                                        </div>
                                    ),
                                )}
                            </div>
                            <label class="text-gray-500 text-sm">
                                Paternal genome
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mt-4 space-x-2">
                    <label for="rat-name">Name your rat:</label>
                    <input
                        class="border-2 rounded-md border-black dark:border-indigo-600"
                        onInput={(e: any) => {
                            const s = this.getMutState();
                            s.rat.name = e.target.value;
                            this.setState(s);
                        }}
                    ></input>
                    <button
                        class="bg-indigo-500 disabled:bg-gray-500 hover:bg-indigo-700 text-white rounded-md ml-auto w-32 h-8"
                        disabled={!this.state.rat.name}
                        onClick={() => {
                            postRat(this.state.rat).then((value: Response) => {
                                console.log(`Got response! ${value.status}`);
                                location.reload();
                            });
                        }}
                    >
                        Send to shed
                    </button>
                </div>
            </div>
        );
    }
}
