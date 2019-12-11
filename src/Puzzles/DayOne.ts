import { PuzzleInput } from "../Input/PuzzleInput";
import { Puzzle } from "./Puzzle";

export class DayOne implements Puzzle {
    protected _input: PuzzleInput;

    public get name(): string {
        return "Day 1";
    }

    constructor(input: PuzzleInput) {
        this._input = input;
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(1);
        return data.map(d => this.fuelForModule(d)).reduce((p, c) => p + c).toString();
    }

    fuelForModule(mass: number): number {
        return Math.floor(mass / 3) - 2;
    }
}