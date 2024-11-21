/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteMessageResponse } from '../../models/delete-message-response';

export interface DeleteMessage$Plain$Params {
  id?: string;
}

export function deleteMessage$Plain(http: HttpClient, rootUrl: string, params?: DeleteMessage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteMessageResponse>> {
  const rb = new RequestBuilder(rootUrl, deleteMessage$Plain.PATH, 'delete');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteMessageResponse>;
    })
  );
}

deleteMessage$Plain.PATH = '/Messages/deleteMessage';
