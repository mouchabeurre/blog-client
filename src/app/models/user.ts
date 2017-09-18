import { COMMENT } from './comment';
import { POST } from './post';

export interface SELFUSER {
  _id: string;
  name: string;
  email: string;
  username: string;
  posts: POST[];
  favourites: string[];
  comments: COMMENT[];
  karma: number;
  date: Date;
  shortUserId: string;
}

export interface LOCALUSER {
  username: string;
  name: string
  email: string;
  shortUserId: string;
}

export interface USER {
  username: string;
  posts: POST[];
  comments: COMMENT[];
  favourites: string[];
  karma: number;
  date: Date;
  shortUserId: string;
}
