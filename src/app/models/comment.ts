export interface COMMENT {
  _id: string;
  content: string;
  modified: boolean;
  karma: number;
  date: Date;
  shortCommentId: string;
  vote?: number;
}
