/* tslint:disable */
/* eslint-disable */
import { MessageDto } from '../models/message-dto';
export interface GetMessagesResponse {
  message?: string | null;
  messagesList?: Array<MessageDto> | null;
  succeed?: boolean;
}
