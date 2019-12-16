import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";
import { Computer } from "../Computer/Computer";

export class DayFiveB implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 05b";
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(5,',');
        const computer = new Computer();
        computer.loadProgram(data);
        computer.execute([5]);
        return computer.outputs.filter(o => o != 0)[0].toString();
    }
    
}