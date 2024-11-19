/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageDto } from '../../models/message-dto';
import { SendMessageResponse } from '../../models/send-message-response';

export interface SendMessege$Plain$Params {
      body?: MessageDto
}

export function sendMessege$Plain(http: HttpClient, rootUrl: string, params?: SendMessege$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<SendMessageResponse>> {
  const rb = new RequestBuilder(rootUrl, sendMessege$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SendMessageResponse>;
    })
  );
}

sendMessege$Plain.PATH = '/Messages/sendMessage';
