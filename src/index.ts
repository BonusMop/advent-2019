import { AdventInput } from "./Input/AdventInput";
import { DayOne } from "./Puzzles/DayOne";
import { Puzzle } from "./Puzzles/Puzzle";

const run = async () => {
    const input = new AdventInput(__dirname + "/data");
    const puzzles: Puzzle[] = [
        new DayOne(input),
    ];

    const solutions = puzzles.map(p => { return { name: p.name, solver: p.solve() }});
    solutions.forEach( async s => console.log(`${s.name}: ${await s.solver}`));
};
run();
