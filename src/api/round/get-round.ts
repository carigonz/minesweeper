import { Request, Response } from 'express';
import {
  getPlainIndexFromBoard,
  getRandomBoardCoordinates,
  makeSquare,
  Square,
  updateBoard,
} from './utils';

export default (_: Request, res: Response) => {
  try {
    const width = 4;
    const height = 4;
    const mines = 5;
    const squareQty = width * height;

    // First we have a board with just squares
    let board: Square[] = Array.from({ length: squareQty }, () => makeSquare());

    // lets fill board with mines
    let counter = 0;
    while (counter < mines) {
      const [rx, ry] = getRandomBoardCoordinates(height, width);
      const candidateIndex = getPlainIndexFromBoard(rx, ry, width);
      const candidateSquare = board[candidateIndex];
      if (!candidateSquare.isMine) {
        candidateSquare.isMine = true;
        board = updateBoard(board, rx, ry, width, height);
        counter += 1;
      }
    }

    res.send({ board });
  } catch (error) {
    res.status(500).send(error);
  }
};
