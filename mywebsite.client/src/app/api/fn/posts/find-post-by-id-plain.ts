/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FindPostResponse } from '../../models/find-post-response';

export interface FindPostById$Plain$Params {
  id?: string;
}

export function findPostById$Plain(http: HttpClient, rootUrl: string, params?: FindPostById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FindPostResponse>> {
  const rb = new RequestBuilder(rootUrl, findPostById$Plain.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FindPostResponse>;
    })
  );
}

findPostById$Plain.PATH = '/Posts/findPost';
