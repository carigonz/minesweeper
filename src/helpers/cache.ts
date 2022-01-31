import { Square } from '../api/round/utils';

interface MemoryCache <T = unknown> {
  [key: string]: T;
}

const KEY = 'Board-game-key';
const cache: MemoryCache = {};

const cacheValue = <T>(
  key: string,
  value?: T | null,
): T | null => {
  if (value || value === null) {
    // eslint-disable-next-line no-return-assign
    return cache[key] = value as T;
  }

  return cache[key] as T || null;
};

export const clearCache = (key?: string) => {
  if (key) {
    const value = Object.keys(cache).find((k) => k === key);
    if (value) {
      delete cache[value];
    }
  } else {
    Object.keys(cache).forEach((c) => {
      delete cache[c];
    });
  }
};

export default cacheValue;

export const getCachedBoard = (id: string): Square[] | null => {
  const keyCache = `${KEY}.${id}`;
  return cacheValue<Square[]>(keyCache);
};

export const createBoard = (
  id: string,
  board: Square[],
  prevId?: string,
) => {
  if (prevId) {
    const oldKey = `${KEY}.${prevId}`;
    clearCache(oldKey);
  }
  const keyCache = `${KEY}.${id}`;
  cacheValue<Square[]>(keyCache, board);
};
