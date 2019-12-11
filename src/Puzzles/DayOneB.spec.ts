import { DayOneB } from './DayOneB';
import { MockInput } from '../Input/MockInput';

test('calculates fuel', async () => {
    const puzzle: DayOneB = new DayOneB(new MockInput([]));
    expect(puzzle.fuelForModule(14)).toBe(2);
    expect(puzzle.fuelForModule(1969)).toBe(966);
    expect(puzzle.fuelForModule(100756)).toBe(50346);
});
