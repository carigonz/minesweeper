import { getRandomBoard } from '../api/round/get-round';
import {
  aroundOffsets,
  existsOnBoard,
  getBoardByLength,
  getPlainIndexFromBoard,
  getRandomBoardCoordinates,
  makeSquare,
} from '../api/round/utils';

describe('Get Board endpoint unit testing suite', () => {
  const width = 6;
  const height = 6;
  const boardPositions = width * height;
  it('Should create a board with 64 positions', () => {
    const board = getRandomBoard(8, 8);
    expect(board.length).toBe(64);
  });

  it('Should return an array of position between board length', () => {
    const [square] = getBoardByLength(width * height);

    expect(square).toEqual(expect.objectContaining(square));
  });

  it('Should return make a square object', () => {
    const square = makeSquare();

    expect(square).toEqual({
      isMine: false,
      counter: 0,
      isCovered: true,
    });
  });

  it('Should return random board coordinates inside board', () => {
    const [x, y] = getRandomBoardCoordinates(width, height);
    const [x1, y1] = getRandomBoardCoordinates(width, height);
    const [x2, y2] = getRandomBoardCoordinates(width, height);

    expect(x * y).toBeLessThanOrEqual(boardPositions);
    expect(x1 * y1).toBeLessThanOrEqual(boardPositions);
    expect(x2 * y2).toBeLessThanOrEqual(boardPositions);
  });

  it('Should get board index from positions', () => {
    const forUpdateX = 0;
    const forUpdateY = 3;
    const index = getPlainIndexFromBoard(forUpdateX, forUpdateY, width);
    expect(index).toBeLessThanOrEqual(boardPositions);
  });

  it('Should get siblings squares indexes by coordinates', () => {
    // coordinate (0,1)) is invalid on first offset (out of board)
    const [x, y] = [0, 1]; // mine coordinates
    const [offset, offsetTwo] = aroundOffsets;
    const [offsetX, offsetY] = offset;
    const [offsetTwoX, offsetTwoY] = offsetTwo;
    const forUpdateX = x + offsetX;
    const forUpdateY = y + offsetY;
    let index: number | null = null;
    if (existsOnBoard(forUpdateX, forUpdateY, width, height)) {
      index = getPlainIndexFromBoard(forUpdateX, forUpdateY, width);
    }
    expect(index).toBeNull();
    const forUpdateTwoX = x + offsetTwoX;
    const forUpdateTwoY = y + offsetTwoY;
    if (existsOnBoard(forUpdateX, forUpdateY, width, height)) {
      index = getPlainIndexFromBoard(forUpdateTwoX, forUpdateTwoY, width);
    }
    expect(index).toBeDefined();
  });
});
