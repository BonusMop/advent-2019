export class Computer {
    private _code: number[] = [];
    private _instance: number[] = [];
    private _outputs: number[] = [];

    get program(): number[] {
        return this._instance;
    }

    get outputs(): number[] {
        return this._outputs;
    }

    loadProgram(intcode: number[]): void {
        this._code = intcode.slice();
        this.reset();
    }

    reset(): void {
        this._instance = this._code.slice();
        this._outputs = [];
    }

    getModes(value: number): number[] {
        const result = [];
        value = Math.floor(value / 100);
        while(value > 0) {
            result.push(value % 10);
            value = Math.floor(value / 10);
        }
        return result;
    }

    getValue(mode: number, opcode: number, data: number[]): number {
        return mode ? opcode : data[opcode]; 
    }

    execute(inputs?: number[]): number {
        const code = this._instance;
        if (!code || code.length <= 0) {
            throw new Error('program is not set');
        }

        const input = inputs || [];

        let done = false;
        let ip = 0;
        while (!done) {
            const instruction = code[ip] % 100;
            const modes = this.getModes(code[ip]);
            switch(instruction) {
                case 1: { // add
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    const out = code[ip+3];
                    const result = val1 + val2;
                    code[out] = result;
                    ip+=4;
                    break;
                }
                case 2: { // mult
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    const out = code[ip+3];
                    const result = val1 * val2;
                    code[out] = result;
                    ip+=4;
                    break;
                }
                case 3: { // input
                    const result = input.splice(0,1)[0];
                    const out = code[ip+1];
                    code[out] = result;
                    ip+=2;
                    break;
                }
                case 4: { // output
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    this._outputs.push(val1);
                    ip+=2;
                    break;
                }
                case 5: { // jump-if-true
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    ip = val1 === 0 ? ip + 3 : val2;
                    break;
                }
                case 6: { // jump-if-false
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    ip = val1 !== 0 ? ip + 3 : val2;
                    break;
                }
                case 7: { // less than
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    const out = code[ip+3];
                    code[out] = 0;
                    if (val1 < val2) {
                        code[out] = 1;
                    }
                    ip+=4;
                    break;
                }
                case 8: { // equals
                    const val1 = this.getValue(modes[0] || 0, code[ip+1], code);
                    const val2 = this.getValue(modes[1] || 0, code[ip+2], code);
                    const out = code[ip+3];
                    code[out] = 0;
                    if (val1 === val2) {
                        code[out] = 1;
                    }
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