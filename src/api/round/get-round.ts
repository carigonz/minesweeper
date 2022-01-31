import { Response, Request } from 'express';
import { getCachedBoard } from '../../helpers/cache';
import {
  getBoardByLength,
  getPlainIndexFromBoard,
  getRandomBoardCoordinates,
  parseQuery,
  Square,
  updateBoard,
} from './utils';

export interface Query {
  id?: string;
  width?: number;
  height?: number;
}

export const getRandomBoard = (width: number, height: number) => {
  const mines = 5;
  const squareQty = width * height;
  // First we have a board with just squares
  let board: Square[] = getBoardByLength(squareQty);

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
  return board;
};

export default (req: Request, res: Response) => {
  try {
    const id = String(req.query.id) || '';
    const lastBoard = getCachedBoard(id);
    // For restarting game
    const makeNew = req.query.new === 'true';
    if (lastBoard && !makeNew) {
      res.send({ board: lastBoard });
      return;
    }

    // New game
    const { width, height } = parseQuery({
      width: Number(req.query.width) || 4,
      height: Number(req.query.height) || 4,
    });

    const board = getRandomBoard(width, height);

    res.send({ board });
  } catch (error) {
    res.status(500).send(error);
  }
};
