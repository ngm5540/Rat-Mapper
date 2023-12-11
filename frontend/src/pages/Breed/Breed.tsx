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
        getAllRats()
            .then((rats: Response) => {
                console.log(`Got response ${rats.status}`);
                rats.json().then((a) => {
                    console.log(`Got rats`);
                    console.log(a);
                    this.setState({
                        rats: a,
                        newRat: this.state.newRat,
                    });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render(): ComponentChild {
        return (
            <div>
                <h1>rat</h1>
            </div>
        );
    }
}
