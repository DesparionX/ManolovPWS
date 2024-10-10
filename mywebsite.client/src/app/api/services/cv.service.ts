/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { loadCv } from '../fn/cv/load-cv';
import { LoadCv$Params } from '../fn/cv/load-cv';

@Injectable({ providedIn: 'root' })
export class CvService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadCv()` */
  static readonly LoadCvPath = '/CV/cv';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadCv()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv$Response(params?: LoadCv$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return loadCv(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadCv$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv(params?: LoadCv$Params, context?: HttpContext): Observable<void> {
    return this.loadCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
