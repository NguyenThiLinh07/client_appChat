import { ReactNode } from 'react';

export type IndexedObject<V = any> = { [k: string]: V };

export type PropsLayout = {
  children?: ReactNode;
  EPath?: string;
  isScroll?: boolean;
};
