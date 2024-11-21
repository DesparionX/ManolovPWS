/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface RegisterResponse {
  message?: string | null;
  succedd?: boolean;
  user?: User;
}
