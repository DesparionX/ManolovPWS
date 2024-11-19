/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cvdto } from '../../models/cvdto';
import { UpdateCvResponse } from '../../models/update-cv-response';

export interface UpdateCv$Plain$Params {
      body?: Cvdto
}

export function updateCv$Plain(http: HttpClient, rootUrl: string, params?: UpdateCv$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateCvResponse>> {
  const rb = new RequestBuilder(rootUrl, updateCv$Plain.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateCvResponse>;
    })
  );
}

updateCv$Plain.PATH = '/CV/updateCV';
