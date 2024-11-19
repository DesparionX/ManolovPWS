/* tslint:disable */
/* eslint-disable */
import { MessageDto } from '../models/message-dto';
export interface ReadMessageResponse {
  dto?: MessageDto;
  message?: string | null;
  succeed?: boolean;
}
