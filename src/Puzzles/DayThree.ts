import { Puzzle } from "./Puzzle";
import { PuzzleInput } from "../Input/PuzzleInput";

type VisitedLocation = {
    x: number;
    y: number;
    firstVisited: boolean;
    secondVisited: boolean;
}

type Map = {
    [index: string]: VisitedLocation;
}

export class DayThree implements Puzzle {

    protected _input: PuzzleInput;
    
    constructor(input: PuzzleInput) {
        this._input = input;
    }

    public get name(): string {
        return "Day 03a";
    }

    public markVisited(map: Map, x: number, y: number, first: boolean): void {
        const key = `${x},${y}`;
        if (!map[key]) {
            map[key]={x: x, y: y, firstVisited: first, secondVisited: !first}
        } else if (first) {
            map[key].firstVisited = true;
        } else {
            map[key].secondVisited = true;
        }
    }

    public mapLocations(directions: string, first: boolean, map: Map = {}): Map {
        let x = 0;
        let y = 0;
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
                this.markVisited(map, x, y, first);
            }
        });

        return map;
    }

    nearestIntersection(map: Map): number {
        const distances = Object.values(map)
            .filter(location => location.firstVisited && location.secondVisited)
            .map(location => Math.abs(location.x) + Math.abs(location.y));
        
        return Math.min(...distances);
    }

    async solve(): Promise<string> {
        const data = await this._input.stringInputFor(3);
        const map = this.mapLocations(data[0], true);
        this.mapLocations(data[1], false, map);
        return this.nearestIntersection(map).toString();
    }
    
}