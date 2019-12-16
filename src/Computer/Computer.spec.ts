import { Computer } from "./Computer";

function runProgram(computer: Computer, code: number[]): number[] {
    computer.loadProgram(code);
    computer.execute();
    return computer.program;
}

test('runs programs', async () => {
    const computer = new Computer();
    expect(runProgram(computer, [1,9,10,3,2,3,11,0,99,30,40,50])).toStrictEqual([3500,9,10,70,2,3,11,0,99,30,40,50]);
    expect(runProgram(computer, [1,0,0,0,99])).toStrictEqual([2,0,0,0,99]);
    expect(runProgram(computer, [2,3,0,3,99])).toStrictEqual([2,3,0,6,99]);
    expect(runProgram(computer, [2,4,4,5,99,0])).toStrictEqual([2,4,4,5,99,9801]);
    expect(runProgram(computer, [1,1,1,4,99,5,6,0,99])).toStrictEqual([30,1,1,4,2,5,6,0,99]);
});

test('inputs and outputs', async () => {
    const computer = new Computer();
    const val = 1312;
    computer.loadProgram([3,0,4,0,99]);
    expect(computer.outputs).toStrictEqual([]);
    computer.execute([val]);
    expect(computer.outputs).toStrictEqual([val]);
});

test('parameter modes', async () => {
    const computer = new Computer();
    expect(runProgram(computer, [1002,4,3,4,33])).toStrictEqual([1002,4,3,4,99]);
});