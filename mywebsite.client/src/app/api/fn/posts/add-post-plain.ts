/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddPostResponse } from '../../models/add-post-response';
import { PostDto } from '../../models/post-dto';

export interface AddPost$Plain$Params {
      body?: PostDto
}

export function addPost$Plain(http: HttpClient, rootUrl: string, params?: AddPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AddPostResponse>> {
  const rb = new RequestBuilder(rootUrl, addPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AddPostResponse>;
    })
  );
}

addPost$Plain.PATH = '/Posts/addPost';
