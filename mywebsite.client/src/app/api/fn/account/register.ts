/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RegisterResponse } from '../../models/register-response';
import { RegisterUserRequest } from '../../models/register-user-request';

export interface Register$Params {
      body?: RegisterUserRequest
}

export function register(http: HttpClient, rootUrl: string, params?: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<RegisterResponse>> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RegisterResponse>;
    })
  );
}

register.PATH = '/Account/register';
