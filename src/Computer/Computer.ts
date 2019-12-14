export class Computer {
    private _code: number[] = [];
    private _instance: number[] = [];

    get program(): number[] {
        return this._instance;
    }

    loadProgram(intcode: number[]): void {
        this._code = intcode.slice();
        this.reset();
    }

    reset(): void {
        this._instance = this._code.slice();
    }

    execute(inputA?: number, inputB?: number): number {
        const code = this._instance;
        if (!code || code.length <= 0) {
            throw new Error('program is not set');
        }
        if (inputA && code.length >= 2) code[1] = inputA;
        if (inputB && code.length >= 3) code[2] = inputB;

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

        return code[0];
    }
}