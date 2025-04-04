/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InitializeCvResult } from '../../models/initialize-cv-result';

export interface InitializeCv$Params {
}

export function initializeCv(http: HttpClient, rootUrl: string, params?: InitializeCv$Params, context?: HttpContext): Observable<StrictHttpResponse<InitializeCvResult>> {
  const rb = new RequestBuilder(rootUrl, initializeCv.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<InitializeCvResult>;
    })
  );
}

initializeCv.PATH = '/CV/initializeCV';
