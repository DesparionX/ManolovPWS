/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { logIn } from '../fn/account/log-in';
import { LogIn$Params } from '../fn/account/log-in';
import { logIn$Plain } from '../fn/account/log-in-plain';
import { LogIn$Plain$Params } from '../fn/account/log-in-plain';
import { LoginResponse } from '../models/login-response';
import { logOut } from '../fn/account/log-out';
import { LogOut$Params } from '../fn/account/log-out';
import { logOut$Plain } from '../fn/account/log-out-plain';
import { LogOut$Plain$Params } from '../fn/account/log-out-plain';
import { LogOutResponse } from '../models/log-out-response';
import { register } from '../fn/account/register';
import { Register$Params } from '../fn/account/register';
import { register$Plain } from '../fn/account/register-plain';
import { Register$Plain$Params } from '../fn/account/register-plain';
import { RegisterResponse } from '../models/register-response';

@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/Account/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Plain$Response(params?: Register$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<RegisterResponse>> {
    return register$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Plain(params?: Register$Plain$Params, context?: HttpContext): Observable<RegisterResponse> {
    return this.register$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<RegisterResponse>): RegisterResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Response(params?: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<RegisterResponse>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register(params?: Register$Params, context?: HttpContext): Observable<RegisterResponse> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<RegisterResponse>): RegisterResponse => r.body)
    );
  }

  /** Path part for operation `logIn()` */
  static readonly LogInPath = '/Account/logIn';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logIn$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  logIn$Plain$Response(params?: LogIn$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
    return logIn$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logIn$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  logIn$Plain(params?: LogIn$Plain$Params, context?: HttpContext): Observable<LoginResponse> {
    return this.logIn$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logIn()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  logIn$Response(params?: LogIn$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
    return logIn(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logIn$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  logIn(params?: LogIn$Params, context?: HttpContext): Observable<LoginResponse> {
    return this.logIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

  /** Path part for operation `logOut()` */
  static readonly LogOutPath = '/Account/logOut';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logOut$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  logOut$Plain$Response(params?: LogOut$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LogOutResponse>> {
    return logOut$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logOut$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logOut$Plain(params?: LogOut$Plain$Params, context?: HttpContext): Observable<LogOutResponse> {
    return this.logOut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LogOutResponse>): LogOutResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logOut()` instead.
   *
   * This method doesn't expect any request body.
   */
  logOut$Response(params?: LogOut$Params, context?: HttpContext): Observable<StrictHttpResponse<LogOutResponse>> {
    return logOut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logOut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logOut(params?: LogOut$Params, context?: HttpContext): Observable<LogOutResponse> {
    return this.logOut$Response(params, context).pipe(
      map((r: StrictHttpResponse<LogOutResponse>): LogOutResponse => r.body)
    );
  }

}
