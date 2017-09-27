export interface COMMENT {
  _id: string;
  authorId: { shortUserId: string, username: string, _id: string };
  content: string;
  modified: boolean;
  karma: number;
  date: Date;
  shortCommentId: string;
  shortPostId: string;
  nestLevel: number;
  replies: COMMENT[];
  parent: COMMENT[];
  vote?: number;
  isReplying?: boolean;
}
