import { AdventInput } from "./Input/AdventInput";
import { DayOne } from "./Puzzles/DayOne";
import { Puzzle } from "./Puzzles/Puzzle";
import { DayOneB } from "./Puzzles/DayOneB";
import { DayTwo } from "./Puzzles/DayTwo";

const run = async (): Promise<void> => {
    const input = new AdventInput(__dirname + "/data");
    const puzzles: Puzzle[] = [
        new DayOne(input),
        new DayOneB(input),
        new DayTwo(input),
    ];

    const solutions = puzzles.map(p => { return { name: p.name, solver: p.solve() }});
    solutions.forEach( async s => console.log(`${s.name}: ${await s.solver}`));
};
run();
