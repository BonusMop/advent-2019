import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";

type VisitedLocation = {
    x: number;
    y: number;
    firstVisited: boolean;
    firstSteps: number;
    secondVisited: boolean;
    secondSteps: number;
}

type Map = {
    [index: string]: VisitedLocation;
}

export class DayThreeB implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 03b";
    }

    public markVisited(map: Map, x: number, y: number, steps: number, first: boolean): void {
        const key = `${x},${y}`;
        if (!map[key]) {
            map[key]={x: x, y: y, firstVisited: false, secondVisited: false, firstSteps:0, secondSteps: 0}
        }
        if (first) {
            map[key].firstVisited = true;
            map[key].firstSteps = steps;
        } else {
            map[key].secondVisited = true;
            map[key].secondSteps = steps;
        }
    }

    public mapLocations(directions: string, first: boolean, map: Map = {}): Map {
        let x = 0;
        let y = 0;
        let steps = 0;
        directions.split(',').forEach( step => {
            const dir = step.charAt(0);
            const magnitude = Number.parseInt(step.substr(1));
            for (let i=0;i<magnitude;i++) {
                switch (dir) {
                    case 'U':
                        y--;
                        break;
                    case 'D':
                        y++;
                        break;
                    case 'L':
                        x--;
                        break;
                    case 'R':
                        x++;
                        break;
                    default:
                        throw new Error(`Bad step: ${step}`);
                }
                steps++;
                this.markVisited(map, x, y, steps, first);
            }
        });

        return map;
    }

    nearestIntersection(map: Map): number {
        const distances = Object.values(map)
            .filter(location => location.firstVisited && location.secondVisited)
            .map(location => location.firstSteps + location.secondSteps);
        
        return Math.min(...distances);
    }

    async solve(): Promise<string> {
        const data = await this._input.stringInputFor(3);
        const map = this.mapLocations(data[0], true);
        this.mapLocations(data[1], false, map);
        return this.nearestIntersection(map).toString();
    }
    
}