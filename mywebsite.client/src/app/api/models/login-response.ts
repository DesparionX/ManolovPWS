/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface LoginResponse {
  jwt?: string | null;
  message?: string | null;
  succeed?: boolean;
  user?: User;
}
