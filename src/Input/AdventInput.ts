import * as fs from 'fs';
import { PuzzleInput } from './PuzzleInput';

export class AdventInput implements PuzzleInput {

    private _dataFolder: string; 

    constructor (dataFolder: string) {
        this._dataFolder = dataFolder;
    }

    async stringInputFor(day: number, delim = '\n'): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readFile(`${this._dataFolder}/input.${day}.txt`, (err, data) => {
                if (err) reject(err);
                resolve(data.toString().split(delim));
            });
        });
    }

    async inputFor<T>(day: number, delim = '\n'): Promise<T[]> {
        return new Promise<T[]>( resolve => {
            this.stringInputFor(day, delim).then(value => resolve(value.map(d => JSON.parse(d) as T)));
        });
    }

}