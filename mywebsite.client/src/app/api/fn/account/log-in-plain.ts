/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginResponse } from '../../models/login-response';
import { LoginUserRequest } from '../../models/login-user-request';

export interface LogIn$Plain$Params {
      body?: LoginUserRequest
}

export function logIn$Plain(http: HttpClient, rootUrl: string, params?: LogIn$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
  const rb = new RequestBuilder(rootUrl, logIn$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoginResponse>;
    })
  );
}

logIn$Plain.PATH = '/Account/logIn';
