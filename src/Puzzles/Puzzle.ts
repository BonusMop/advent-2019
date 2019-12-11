export interface Puzzle {
    solve(): Promise<string>;
    readonly name: string;
}