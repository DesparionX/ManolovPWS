/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteMessage } from '../fn/messages/delete-message';
import { DeleteMessage$Params } from '../fn/messages/delete-message';
import { deleteMessage$Plain } from '../fn/messages/delete-message-plain';
import { DeleteMessage$Plain$Params } from '../fn/messages/delete-message-plain';
import { DeleteMessageResponse } from '../models/delete-message-response';
import { getAllMessages } from '../fn/messages/get-all-messages';
import { GetAllMessages$Params } from '../fn/messages/get-all-messages';
import { getAllMessages$Plain } from '../fn/messages/get-all-messages-plain';
import { GetAllMessages$Plain$Params } from '../fn/messages/get-all-messages-plain';
import { GetMessagesResponse } from '../models/get-messages-response';
import { readMessage } from '../fn/messages/read-message';
import { ReadMessage$Params } from '../fn/messages/read-message';
import { readMessage$Plain } from '../fn/messages/read-message-plain';
import { ReadMessage$Plain$Params } from '../fn/messages/read-message-plain';
import { ReadMessageResponse } from '../models/read-message-response';
import { SendMessageResponse } from '../models/send-message-response';
import { sendMessege } from '../fn/messages/send-messege';
import { SendMessege$Params } from '../fn/messages/send-messege';
import { sendMessege$Plain } from '../fn/messages/send-messege-plain';
import { SendMessege$Plain$Params } from '../fn/messages/send-messege-plain';

@Injectable({ providedIn: 'root' })
export class MessagesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sendMessege()` */
  static readonly SendMessegePath = '/Messages/sendMessage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessege$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessege$Plain$Response(params?: SendMessege$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<SendMessageResponse>> {
    return sendMessege$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessege$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessege$Plain(params?: SendMessege$Plain$Params, context?: HttpContext): Observable<SendMessageResponse> {
    return this.sendMessege$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<SendMessageResponse>): SendMessageResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessege()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessege$Response(params?: SendMessege$Params, context?: HttpContext): Observable<StrictHttpResponse<SendMessageResponse>> {
    return sendMessege(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessege$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessege(params?: SendMessege$Params, context?: HttpContext): Observable<SendMessageResponse> {
    return this.sendMessege$Response(params, context).pipe(
      map((r: StrictHttpResponse<SendMessageResponse>): SendMessageResponse => r.body)
    );
  }

  /** Path part for operation `getAllMessages()` */
  static readonly GetAllMessagesPath = '/Messages/getAllMessages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMessages$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages$Plain$Response(params?: GetAllMessages$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMessagesResponse>> {
    return getAllMessages$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllMessages$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages$Plain(params?: GetAllMessages$Plain$Params, context?: HttpContext): Observable<GetMessagesResponse> {
    return this.getAllMessages$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMessagesResponse>): GetMessagesResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMessages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages$Response(params?: GetAllMessages$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMessagesResponse>> {
    return getAllMessages(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllMessages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMessages(params?: GetAllMessages$Params, context?: HttpContext): Observable<GetMessagesResponse> {
    return this.getAllMessages$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMessagesResponse>): GetMessagesResponse => r.body)
    );
  }

  /** Path part for operation `readMessage()` */
  static readonly ReadMessagePath = '/Messages/readMessage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readMessage$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMessage$Plain$Response(params?: ReadMessage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ReadMessageResponse>> {
    return readMessage$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readMessage$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMessage$Plain(params?: ReadMessage$Plain$Params, context?: HttpContext): Observable<ReadMessageResponse> {
    return this.readMessage$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReadMessageResponse>): ReadMessageResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readMessage()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMessage$Response(params?: ReadMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<ReadMessageResponse>> {
    return readMessage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readMessage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMessage(params?: ReadMessage$Params, context?: HttpContext): Observable<ReadMessageResponse> {
    return this.readMessage$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReadMessageResponse>): ReadMessageResponse => r.body)
    );
  }

  /** Path part for operation `deleteMessage()` */
  static readonly DeleteMessagePath = '/Messages/deleteMessage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMessage$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMessage$Plain$Response(params?: DeleteMessage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteMessageResponse>> {
    return deleteMessage$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMessage$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMessage$Plain(params?: DeleteMessage$Plain$Params, context?: HttpContext): Observable<DeleteMessageResponse> {
    return this.deleteMessage$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteMessageResponse>): DeleteMessageResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMessage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMessage$Response(params?: DeleteMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteMessageResponse>> {
    return deleteMessage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMessage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMessage(params?: DeleteMessage$Params, context?: HttpContext): Observable<DeleteMessageResponse> {
    return this.deleteMessage$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteMessageResponse>): DeleteMessageResponse => r.body)
    );
  }

}
