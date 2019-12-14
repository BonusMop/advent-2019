import { DayFourB } from './DayFourB';

test ('finds digits', async () => {
    const puzzle: DayFourB = new DayFourB();
    expect(puzzle.digitAt(9876,2)).toBe(8);    
    expect(puzzle.digitAt(9876,0)).toBe(6);    
    expect(puzzle.digitAt(9876,3)).toBe(9);    
});

test('finds valid passwords', async () => {
    const puzzle: DayFourB = new DayFourB();
    expect(puzzle.isValid(112233)).toBeTruthy();
    expect(puzzle.isValid(111122)).toBeTruthy();
    expect(puzzle.isValid(123444)).toBeFalsy();
});