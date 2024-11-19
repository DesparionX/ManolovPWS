/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteMessageResponse } from '../../models/delete-message-response';

export interface DeleteMessage$Params {
  id?: string;
}

export function deleteMessage(http: HttpClient, rootUrl: string, params?: DeleteMessage$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteMessageResponse>> {
  const rb = new RequestBuilder(rootUrl, deleteMessage.PATH, 'post');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteMessageResponse>;
    })
  );
}

deleteMessage.PATH = '/Messages/deleteMessage';
