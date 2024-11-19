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
import { loadCv$Plain } from '../fn/cv/load-cv-plain';
import { LoadCv$Plain$Params } from '../fn/cv/load-cv-plain';
import { LoadCvResponse } from '../models/load-cv-response';
import { updateCv } from '../fn/cv/update-cv';
import { UpdateCv$Params } from '../fn/cv/update-cv';
import { updateCv$Plain } from '../fn/cv/update-cv-plain';
import { UpdateCv$Plain$Params } from '../fn/cv/update-cv-plain';
import { UpdateCvResponse } from '../models/update-cv-response';

@Injectable({ providedIn: 'root' })
export class CvService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `loadCv()` */
  static readonly LoadCvPath = '/CV/loadCV';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadCv$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv$Plain$Response(params?: LoadCv$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LoadCvResponse>> {
    return loadCv$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadCv$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv$Plain(params?: LoadCv$Plain$Params, context?: HttpContext): Observable<LoadCvResponse> {
    return this.loadCv$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoadCvResponse>): LoadCvResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadCv()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv$Response(params?: LoadCv$Params, context?: HttpContext): Observable<StrictHttpResponse<LoadCvResponse>> {
    return loadCv(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadCv$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadCv(params?: LoadCv$Params, context?: HttpContext): Observable<LoadCvResponse> {
    return this.loadCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoadCvResponse>): LoadCvResponse => r.body)
    );
  }

  /** Path part for operation `updateCv()` */
  static readonly UpdateCvPath = '/CV/updateCV';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCv$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCv$Plain$Response(params?: UpdateCv$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateCvResponse>> {
    return updateCv$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCv$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCv$Plain(params?: UpdateCv$Plain$Params, context?: HttpContext): Observable<UpdateCvResponse> {
    return this.updateCv$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateCvResponse>): UpdateCvResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCv()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCv$Response(params?: UpdateCv$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateCvResponse>> {
    return updateCv(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCv$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCv(params?: UpdateCv$Params, context?: HttpContext): Observable<UpdateCvResponse> {
    return this.updateCv$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateCvResponse>): UpdateCvResponse => r.body)
    );
  }

}
