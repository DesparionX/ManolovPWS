/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ReadMessageResponse } from '../../models/read-message-response';

export interface ReadMessage$Params {
  id?: string;
}

export function readMessage(http: HttpClient, rootUrl: string, params?: ReadMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<ReadMessageResponse>> {
  const rb = new RequestBuilder(rootUrl, readMessage.PATH, 'post');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ReadMessageResponse>;
    })
  );
}

readMessage.PATH = '/Messages/readMessage';
