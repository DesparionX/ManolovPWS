/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoadCvResponse } from '../../models/load-cv-response';

export interface LoadCv$Plain$Params {
}

export function loadCv$Plain(http: HttpClient, rootUrl: string, params?: LoadCv$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LoadCvResponse>> {
  const rb = new RequestBuilder(rootUrl, loadCv$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoadCvResponse>;
    })
  );
}

loadCv$Plain.PATH = '/CV/loadCV';
