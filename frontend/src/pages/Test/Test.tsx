import { Component, ComponentChild } from "preact";

import { rnaPolymerase, ribosome } from "../../proteins";

type TestProps = {};
type TestState = { codon: string };

export class Test extends Component<TestProps, TestState> {
    defaultValue = "Enter a codon!";

    constructor(props: {}) {
        super(props);
        this.state = { codon: this.defaultValue };
    }

    onCodonInput(codon: string) {
        var state = {} as TestState;
        if (codon.length != 3) {
            state.codon = this.defaultValue;
            this.setState(state);
        } else {
            const encoded = ribosome(rnaPolymerase(codon));
            if (encoded == null) {
                state.codon = "invalid input!";
            } else {
                state.codon = encoded;
            }
            this.setState(state);
        }
    }

    render(): ComponentChild {
        return (
            <div>
                <label for="codon_input">Enter RNA: </label>
                <input
                    id="codon_input"
                    maxLength={3}
                    class="border-black border-4"
                    placeholder="UUG"
                    onInput={(e: any) => this.onCodonInput(e.target.value)}
                />
                <p>{this.state.codon}</p>
            </div>
        );
    }
}
