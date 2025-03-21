/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMessagesResponse } from '../../models/get-messages-response';

export interface GetAllMessages$Plain$Params {
}

export function getAllMessages$Plain(http: HttpClient, rootUrl: string, params?: GetAllMessages$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMessagesResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllMessages$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetMessagesResponse>;
    })
  );
}

getAllMessages$Plain.PATH = '/Messages/getAllMessages';
