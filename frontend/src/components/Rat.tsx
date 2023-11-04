import { Rat } from "../rat";

type RatComponentProps = {
	rat: Rat
}

/**
 * Display your rat as a table
 *
 * @param p props for RatComponent; see {@link RatComponentProps}
 */
export function RatComponent(p: RatComponentProps) {
	return (
		<ul>
			<li>Fur color: {p.rat.furColor}</li>
			<li>Eye color: {p.rat.eyeColor}</li>
			<li>Ear size: {p.rat.earSize}</li>
			<li>Blood type: {p.rat.bloodType}</li>
		</ul>
	);
}
