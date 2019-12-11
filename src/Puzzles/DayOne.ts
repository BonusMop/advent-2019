import { PuzzleInput } from "../Input/PuzzleInput";
import { Puzzle } from "./Puzzle";

export class DayOne implements Puzzle {
    private _input: PuzzleInput;
    public readonly name = "Day 1";

    constructor(input: PuzzleInput) {
        this._input = input;
    }

    async solve() {
        const data = await this._input.inputFor<number>(1);
        return data.map(d => this.fuelForModule(d)).reduce((p, c) => p + c).toString();
    }

    fuelForModule(mass: number): number {
        return Math.floor(mass / 3) - 2;
    }
}