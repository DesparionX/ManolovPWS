/* tslint:disable */
/* eslint-disable */
import { PostRm } from '../models/post-rm';
export interface GetPostsResponse {
  message?: string | null;
  posts?: Array<PostRm> | null;
  succeeded?: boolean;
}
