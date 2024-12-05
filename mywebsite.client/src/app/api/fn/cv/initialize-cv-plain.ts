/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InitializeCvResult } from '../../models/initialize-cv-result';

export interface InitializeCv$Plain$Params {
}

export function initializeCv$Plain(http: HttpClient, rootUrl: string, params?: InitializeCv$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<InitializeCvResult>> {
  const rb = new RequestBuilder(rootUrl, initializeCv$Plain.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InitializeCvResult>;
    })
  );
}

initializeCv$Plain.PATH = '/CV/initializeCV';
