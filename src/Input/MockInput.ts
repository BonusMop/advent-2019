import { PuzzleInput } from "./PuzzleInput";

export class MockInput implements PuzzleInput {
    private _data: string[];

    constructor(data: string[]) {
        this._data = data;
    }

    stringInputFor(day: number): Promise<string[]> {
        return Promise.resolve(this._data);
    }

    inputFor<T>(day: number): Promise<T[]> {
        return Promise.resolve(this._data.map(d => JSON.parse(d) as T))
    }
}