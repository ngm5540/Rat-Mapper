import { Rat, earSizeToString, eyeColorToString, furColorToString, hairTypeToString, mendelToString, tailLengthToString } from "../rat";


export type RatComponentProps = {
    rat: Rat
};
/**
 * Display your rat as a table
 *
 * @param p props for RatComponent; see {@link RatComponentProps}
 */
export function RatComponent(p: RatComponentProps) {
    return (
        <ul>
            <li>Name: {p.rat.name}</li>
            <li>Fur color: {furColorToString(p.rat.fur_color)} - {p.rat.fur_color}</li>
            <li>Eye color: {eyeColorToString(p.rat.eye_color)} - {mendelToString(p.rat.eye_color)}</li>
            <li>Hair type: {hairTypeToString(p.rat.hair)} - {mendelToString(p.rat.hair)}</li>
            <li>Ear size: {earSizeToString(p.rat.ear_size)} - {mendelToString(p.rat.ear_size)}</li>
            <li>Tail size: {tailLengthToString(p.rat.tail_size)} - {mendelToString(p.rat.tail_size)}</li>
        </ul>
    );
}
