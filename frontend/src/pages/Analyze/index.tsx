import { Component } from 'preact';
import { Rat } from '../../rat';
import './style.css';
import { RatComponent } from '../../components/Rat';


export type AnalyzeProps  = {
	dna: string
};

export type AnalyzeState = {
	gotRat: boolean,
	responseOK: boolean,
	rat: Rat | undefined,
};

export class Analyze extends Component<any, AnalyzeState>  {
		constructor() {
			super();
			this.state = {gotRat: false, responseOK: false, rat: null};
		}

		componentDidMount() {
			console.log(`Requesting DNA parsing for ${this.props.dna}`);
			fetch(`http://localhost:8080/parse/${this.props.dna}`)
				.then((value: Response) => {
					console.log(`Got response! ${value.status}`);
					if (value.ok) {
						value.json().then((data) => {
							console.log(`Parsed value...`);
							console.log(data);
							this.setState({
								gotRat: true,
								responseOK: value.ok,
								rat: data
							});
						});
					} else {
						this.setState({gotRat: true, responseOK: false});
					}
				}).catch(() => {
					this.setState({gotRat: true, responseOK: false});
				});
		}

		render() {
			if (this.state.gotRat) {
				if (this.state.responseOK) {
					return (
						<div class="analyze">
						<h1>About your rat:</h1>
							<RatComponent rat={this.state.rat!} />
						</div>
					);
				}  else {
					return (
						<h1> Could not get your rat! 😔 🐀</h1>
					);
				}
			} else {
				return (
					<h1>Please wait... rat is chewing 🧀 🐀</h1>
				);
			}
		}
}
