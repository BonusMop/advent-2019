import * as fs from 'fs';
import { PuzzleInput } from './PuzzleInput';

export class AdventInput implements PuzzleInput {

    private _dataFolder: string; 

    constructor (dataFolder: string) {
        this._dataFolder = dataFolder;
    }

    async stringInputFor(day: number): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readFile(`${this._dataFolder}/input.${day}.txt`, (err, data) => {
                if (err) reject(err);
                resolve(data.toString().split('\n'));
            });
        });
    }

    async inputFor<T>(day: number): Promise<T[]> {
        return new Promise<T[]>( async resolve => {
            resolve ((await this.stringInputFor(day)).map(d => JSON.parse(d) as T));
        });
    }

}