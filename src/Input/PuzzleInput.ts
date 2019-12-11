export interface PuzzleInput {
    stringInputFor(day: number): Promise<string[]>;
    inputFor<T>(day: number): Promise<T[]>;
}