/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostDto } from '../../models/post-dto';
import { UpdatePostResponse } from '../../models/update-post-response';

export interface UpdatePost$Plain$Params {
      body?: PostDto
}

export function updatePost$Plain(http: HttpClient, rootUrl: string, params?: UpdatePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdatePostResponse>> {
  const rb = new RequestBuilder(rootUrl, updatePost$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdatePostResponse>;
    })
  );
}

updatePost$Plain.PATH = '/Posts/updatePost';
