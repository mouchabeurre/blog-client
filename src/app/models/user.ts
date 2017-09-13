export interface SELFUSER {
  _id: string;
  name: string;
  email: string;
  username: string;
  favourites: string[];
  comments: string[];
  karma: number;
  date: Date;
  shortUserId: string;
}

export interface USER {
  username: string;
  favourites: string[];
  comments: string[];
  karma: number;
  date: Date;
  shortUserId: string;
}
