import { Component } from 'preact';
import { Rat } from '../../rat';
import './style.css';


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
			fetch(`http://localhost:8080/parse/${this.props.dna}`)
				.then((value: Response) => {
					if (value.ok) {
						value.json().then((data) => {
							this.setState({
								gotRat: true, 
								responseOK: true, 
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
					const rat = this.state.rat!;
					return (
						<div class="analyze">
						<h1>About your rat:</h1>
						<ul>
							<li>Fur color: {rat.furColor}</li>
							<li>Eye color: {rat.eyeColor}</li>
							<li>Ear size: {rat.earSize}</li>
							<li>Blood type: {rat.bloodType}</li>
						</ul>
						</div>
					);
				}  else {
					return (
						<h1> Could not get your rat! 🐀😔</h1>
					);
				}
			} else {
				return (
					<h1>Please wait... rat is chewing 🧀 🐀</h1>
				);
			}
		}
}
