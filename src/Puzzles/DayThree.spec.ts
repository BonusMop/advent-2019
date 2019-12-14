import { DayThree } from './DayThree';
import { MockInput } from '../Input/MockInput';

test('calculates fuel', async () => {
    const puzzle: DayThree = new DayThree(new MockInput([]));

    const firstMap = puzzle.mapLocations('R8,U5,L5,D3', true);
    puzzle.mapLocations('U7,R6,D4,L4', false, firstMap);
    expect(puzzle.nearestIntersection(firstMap)).toBe(6);

    const secondMap = puzzle.mapLocations('R75,D30,R83,U83,L12,D49,R71,U7,L72', true);
    puzzle.mapLocations('U62,R66,U55,R34,D71,R55,D58,R83', false, secondMap);
    expect(puzzle.nearestIntersection(secondMap)).toBe(159);

    const thirdMap = puzzle.mapLocations('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', true);
    puzzle.mapLocations('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7', false, thirdMap);
    expect(puzzle.nearestIntersection(thirdMap)).toBe(135);
});
