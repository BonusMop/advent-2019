import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";
import { Computer } from "../Computer/Computer";

export class DayTwoB implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 02b";
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(2,',');
        const computer = new Computer();
        computer.loadProgram(data);
        
        const goal = 19690720;
        for (let i = 0;i<100; i++) {
            for (let j = 0;j<100; j++) {
                computer.reset();
                if (computer.execute(i,j) == goal) {
                    console.log(`${i},${j}=${computer.program}`);
                    return (100*i+j).toString();
                }
            }
        }
        
        throw new Error('no successful inputs found');
    }
}