import { Puzzle } from "./Puzzle";

export class DayFour implements Puzzle {

    public get name(): string {
        return "Day 04a";
    }

    public digitAt(input: number, pos: number): number {
        // divide by a power of 10 to move the interesting digit into ones
        const result = Math.floor(input / Math.pow(10, pos));

        // now get the modulus to find that digit
        return result % 10;
    }

    public isValid(password: number): boolean {
        const one = this.digitAt(password, 5);
        const two = this.digitAt(password, 4);
        const three = this.digitAt(password, 3);
        const four = this.digitAt(password, 2);
        const five = this.digitAt(password, 1);
        const six = this.digitAt(password, 0);

        const unordered = (one > two || two > three || three > four || four > five || five > six);
        const adjacency = (one === two || two === three || three === four || four === five || five === six);
        return (!unordered && adjacency);      
    }

    async solve(): Promise<string> {
        let count = 0;
        for (let i = 124075; i<=580769; i++) {
            if (this.isValid(i)) {
                count++;
            }
        }
        return count.toString();
    }
    
}