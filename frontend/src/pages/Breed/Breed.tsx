import {
    Attributes,
    Component,
    ComponentChild,
    ComponentChildren,
    Ref,
} from "preact";
import { Rat } from "../../rat";
import { getAllRats } from "../../backend";

type BreedProps = {};
type BreedState = {
    rats: undefined | Rat[];
    newRat: Rat;
};
export class Breed extends Component<BreedProps, BreedState> {
    constructor() {
        super();
        this.state = {
            rats: null,
            newRat: {} as Rat,
        };
    }

    componentDidMount(): void {
        // make ajax call to get new rats
        getAllRats();
    }

    render(): ComponentChild {
        return (
            <div>
                <h1>rat</h1>
            </div>
        );
    }
}
