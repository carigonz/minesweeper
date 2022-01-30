/* eslint-disable function-paren-newline */
export interface Square {
  isMine: boolean;
  counter: number; // mines around
  isCovered: boolean; // already revealed
}

export const makeSquare = (): Square => ({
  isMine: false,
  counter: 0,
  isCovered: true,
});

export const getRandomBoardCoordinates = (height: number, width: number) => [
  (Math.floor(Math.random() * width)),
  (Math.floor(Math.random() * height)),
];

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

const aroundOffsets: number[][] = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], /* [this] */ [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

const existsOnBoard = (x: number, y: number, width: number, height: number) => (
  x < width && y < height && x >= 0 && y >= 0
);

const updateSiblingsSquaresMineCount = (
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
  const indexes = updateSiblingsSquaresMineCount(x, y, width, height);

  return board.map((square, index) => (
    indexes.includes(index) ? mapMineCount(square) : square
  ));
};
