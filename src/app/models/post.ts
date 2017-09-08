import { COMMENT } from './comment';

export class POST {
  _id: string;
  title: string;
  content: string;
  imageURL: string;
  authorId: {
    _id: string;
    username: string;
    shortUserId: string;
  };
  karma: number;
  views: number;
  date: Date;
  shortPostId: string;
  comments: Comment[];
}
