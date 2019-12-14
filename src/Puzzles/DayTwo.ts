import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";
import { Computer } from "../Computer/Computer";

export class DayTwo implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 02a";
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(2,',');
        data[1]=12;
        data[2]=2;

        const computer = new Computer();
        computer.loadProgram(data);
        return computer.execute().toString();
    }
    
}