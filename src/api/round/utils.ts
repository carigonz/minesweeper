import { Query } from './get-round';

export interface Square {
  isMine: boolean;
  counter: number; // mines around
  isCovered: boolean; // already revealed
}

const DEFAULT_BOARD = 4;

export const makeSquare = (): Square => ({
  isMine: false,
  counter: 0,
  isCovered: true,
});

export const getRandomBoardCoordinates = (height: number, width: number) => [
  (Math.floor(Math.random() * width)),
  (Math.floor(Math.random() * height)),
];

export const getBoardByLength = (length: number) => (
  Array.from({ length }, () => makeSquare())
);
const mapMineCount = (square: Square) => {
  if (!square.isMine) {
    const counter = square.counter + 1;
    return { ...square, counter };
  }
  return square;
};
// get plane index from matrix
export const getPlainIndexFromBoard = (x: number, y: number, width: number) => (
  x + (y * width)
);

export const aroundOffsets: number[][] = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], /* [this] */ [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

export const existsOnBoard = (
  x: number,
  y: number,
  width: number,
  height: number,
) => (x < width && y < height && x >= 0 && y >= 0);

export const getSiblingsSquaresIndexes = (
  x: number,
  y: number,
  width: number,
  height: number,
): number[] => aroundOffsets.reduce((acc, [offsetX, offsetY]) => {
  const forUpdateX = x + offsetX;
  const forUpdateY = y + offsetY;
  if (existsOnBoard(forUpdateX, forUpdateY, width, height)) {
    const index = getPlainIndexFromBoard(forUpdateX, forUpdateY, width);
    return [...acc, index];
  }
  return acc;
}, []);

export const updateBoard = (
  board: Square[],
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const indexes = getSiblingsSquaresIndexes(x, y, width, height);

  return board.map((square, index) => (
    indexes.includes(index) ? mapMineCount(square) : square
  ));
};

const getValue = (value?: string | number): number => (
  Number.isNaN(Number(value)) ? DEFAULT_BOARD : Number(value)
);

export const parseQuery = (query: Query) => ({
  width: getValue(query.width),
  height: getValue(query.height),
});
