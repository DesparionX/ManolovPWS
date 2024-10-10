/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteRequest } from '../../models/delete-request';
import { DeleteResponse } from '../../models/delete-response';

export interface DeletePost$Params {
      body?: DeleteRequest
}

export function deletePost(http: HttpClient, rootUrl: string, params?: DeletePost$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteResponse>> {
  const rb = new RequestBuilder(rootUrl, deletePost.PATH, 'delete');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteResponse>;
    })
  );
}

deletePost.PATH = '/Posts/deletePost';
