/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LogOutResponse } from '../../models/log-out-response';

export interface LogOut$Plain$Params {
}

export function logOut$Plain(http: HttpClient, rootUrl: string, params?: LogOut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LogOutResponse>> {
  const rb = new RequestBuilder(rootUrl, logOut$Plain.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LogOutResponse>;
    })
  );
}

logOut$Plain.PATH = '/Account/logOut';
