import crypto from 'crypto';
import { Request, Response } from 'express';
import { createBoard } from '../../helpers/cache';
import {
  getBoardByLength,
  getPlainIndexFromBoard,
  getRandomBoardCoordinates,
  Square,
  updateBoard,
} from './utils';

export interface Body {
  id?: string;
  board?: Square[];
}
export const getBoard = (width: number, height: number) => {
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
    const { id, board }: Body = req.body;

    // We should handle errors
    if (!board?.length) {
      return;
    }
    const uuid = crypto.randomBytes(16).toString('hex');
    createBoard(uuid, board, id);

    res.send({ message: 'Board saved!', id: uuid });
  } catch (error) {
    res.status(500).send(error);
  }
};
