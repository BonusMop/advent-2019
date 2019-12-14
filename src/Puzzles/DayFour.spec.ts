import { DayFour } from './DayFour';

test ('finds digits', async () => {
    const puzzle: DayFour = new DayFour();
    expect(puzzle.digitAt(9876,2)).toBe(8);    
    expect(puzzle.digitAt(9876,0)).toBe(6);    
    expect(puzzle.digitAt(9876,3)).toBe(9);    
});

test('finds valid passwords', async () => {
    const puzzle: DayFour = new DayFour();
    expect(puzzle.isValid(122345)).toBeTruthy();
    expect(puzzle.isValid(111111)).toBeTruthy();
    expect(puzzle.isValid(223450)).toBeFalsy();
    expect(puzzle.isValid(123789)).toBeFalsy();
});