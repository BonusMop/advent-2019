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

test('comparisons and jumps (day 5)', async () => {
    const computer = new Computer();

    // equal to 8?
    computer.loadProgram([3,9,8,9,10,9,4,9,99,-1,8]); 
    computer.execute([8]);
    expect(computer.outputs).toStrictEqual([1]);
    computer.reset();
    computer.execute([7]);
    expect(computer.outputs).toStrictEqual([0]);

    // less than 8?
    computer.loadProgram([3,3,1107,-1,8,3,4,3,99]);
    computer.execute([8]);
    expect(computer.outputs).toStrictEqual([0]);
    computer.reset();
    computer.execute([7]);
    expect(computer.outputs).toStrictEqual([1]);

    // non-zero?
    computer.loadProgram([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]);
    computer.execute([0]);
    expect(computer.outputs).toStrictEqual([0]);
    computer.reset();
    computer.execute([7]);
    expect(computer.outputs).toStrictEqual([1]);

    // less than, equal to, or greater than 8
    computer.loadProgram([
        3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
        1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
        999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]);
    computer.execute([1]);
    expect(computer.outputs).toStrictEqual([999]);
    computer.reset();
    computer.execute([8]);
    expect(computer.outputs).toStrictEqual([1000]);
    computer.reset();
    computer.execute([13128]);
    expect(computer.outputs).toStrictEqual([1001]);
});