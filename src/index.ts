import { AdventInput } from "./Input/AdventInput";
import { DayOne } from "./Puzzles/DayOne";
import { Puzzle } from "./Puzzles/Puzzle";
import { DayOneB } from "./Puzzles/DayOneB";
import { DayTwo } from "./Puzzles/DayTwo";
import { DayTwoB } from "./Puzzles/DayTwoB";
import { DayThree } from "./Puzzles/DayThree";
import { DayThreeB } from "./Puzzles/DayThreeB";
import { DayFour } from "./Puzzles/DayFour";
import { DayFourB } from "./Puzzles/DayFourB";
import { DayFive } from "./Puzzles/DayFive";

/*
Day 01a: 3363929
Day 01b: 5043026
Day 02a: 3562672
Day 02b: 8250
Day 03a: 1519
Day 03b: 14358
Day 04a: 2150
Day 04b: 1462
Day 05a: 4887191
*/

const run = async (): Promise<void> => {
    const input = new AdventInput(__dirname + "/data");
    const puzzles: Puzzle[] = [
        new DayOne(input),
        new DayOneB(input),
        new DayTwo(input),
        new DayTwoB(input),
        new DayThree(input),
        new DayThreeB(input),
        new DayFour(),
        new DayFourB(),
        new DayFive(input),
    ];

    const solutionPromises = puzzles.map(p => { return { name: p.name, solver: p.solve() }})
                             .map(async s => { return { name: s.name, answer: await s.solver}})
    const solutions = await Promise.all(solutionPromises);
    solutions.sort((a,b) => a.name > b.name ? 1 : -1).forEach( async s => console.log(`${s.name}: ${s.answer}`));
};
run();
