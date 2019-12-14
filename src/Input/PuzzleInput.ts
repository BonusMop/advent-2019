export interface PuzzleInput {
    stringInputFor(day: number, delim?: string): Promise<string[]>;
    inputFor<T>(day: number, delim?: string): Promise<T[]>;
}