import { DayOne } from './DayOne';
import { MockInput } from '../Input/MockInput';

test('calculates fuel', async () => {
    const puzzle: DayOne = new DayOne(new MockInput(['12','14','1969','100756']));
    expect(puzzle.fuelForModule(12)).toBe(2);
    expect(puzzle.fuelForModule(14)).toBe(2);
    expect(puzzle.fuelForModule(1969)).toBe(654);
    expect(puzzle.fuelForModule(100756)).toBe(33583);
    expect(await puzzle.solve()).toBe('34241');
});
