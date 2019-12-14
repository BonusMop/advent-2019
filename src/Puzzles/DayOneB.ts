import { DayOne } from "./DayOne";

export class DayOneB extends DayOne {
    public get name(): string {
        return "Day 01b";
    }

    async solve(): Promise<string> {
        const data = await this._input.inputFor<number>(1);
        return data.map(d => this.fuelForModule(d)).reduce((p, c) => p + c).toString();
    }

    fuelForModule(mass: number): number {
        if (mass <= 0) return 0;
        const fuel = Math.floor(mass / 3) - 2;
        const fuelForFuel = this.fuelForModule(fuel);
        return Math.max(0, fuel+fuelForFuel);
    }
}