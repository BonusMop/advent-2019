import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";

export class DayTwo implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 02a";
    }

    summarizeInstruction(code: number[], ip: number, result: number): void {
        console.log(`Instruction: ${code[ip]} ${code[ip+1]}[=${code[code[ip+1]]}] ${code[ip+2]}[=${code[code[ip+2]]}] ${code[ip+3]}[=${code[code[ip+3]]}]`)
        console.log(`  replacing value ${code[code[ip+3]]} at ${code[ip+3]} with result ${result}`);
    }

    processCode(code: number[]): number[] {
        if (!code || code.length <= 0) {
            throw new Error('code does not exist');
        }

        let done = false;
        let ip = 0;
        while (!done) {
            const instruction = code[ip];
            switch(instruction) {
                case 1: { // add
                    const op1 = code[ip+1];
                    const op2 = code[ip+2];
                    const out = code[ip+3];
                    const result = code[op1] + code[op2];
                    code[out] = result;
                    ip+=4;
                    break;
                }
                case 2: { // mult
                    const op1 = code[ip+1];
                    const op2 = code[ip+2];
                    const out = code[ip+3];
                    const result = code[op1] * code[op2];
                    code[out] = result;
                    ip+=4;
                    break;
                }
                case 99: { // terminate
                    done = true;
                    break; 
                }
                default: {
                    throw new Error(`encountered instruction ${code[ip]} at position ${ip}`)
                }

            }

        }

        return code;
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(2,',');
        data[1]=12;
        data[2]= 2;
        return this.processCode(data)[0].toString();
    }

    
}