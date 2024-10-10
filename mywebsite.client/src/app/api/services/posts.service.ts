/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addPost } from '../fn/posts/add-post';
import { AddPost$Params } from '../fn/posts/add-post';
import { addPost$Plain } from '../fn/posts/add-post-plain';
import { AddPost$Plain$Params } from '../fn/posts/add-post-plain';
import { AddPostResponse } from '../models/add-post-response';
import { deletePost } from '../fn/posts/delete-post';
import { DeletePost$Params } from '../fn/posts/delete-post';
import { deletePost$Plain } from '../fn/posts/delete-post-plain';
import { DeletePost$Plain$Params } from '../fn/posts/delete-post-plain';
import { DeleteResponse } from '../models/delete-response';
import { findPostById } from '../fn/posts/find-post-by-id';
import { FindPostById$Params } from '../fn/posts/find-post-by-id';
import { findPostById$Plain } from '../fn/posts/find-post-by-id-plain';
import { FindPostById$Plain$Params } from '../fn/posts/find-post-by-id-plain';
import { FindPostResponse } from '../models/find-post-response';
import { getPosts } from '../fn/posts/get-posts';
import { GetPosts$Params } from '../fn/posts/get-posts';
import { getPosts$Plain } from '../fn/posts/get-posts-plain';
import { GetPosts$Plain$Params } from '../fn/posts/get-posts-plain';
import { GetPostsResponse } from '../models/get-posts-response';
import { updatePost } from '../fn/posts/update-post';
import { UpdatePost$Params } from '../fn/posts/update-post';
import { updatePost$Plain } from '../fn/posts/update-post-plain';
import { UpdatePost$Plain$Params } from '../fn/posts/update-post-plain';
import { UpdatePostResponse } from '../models/update-post-response';

@Injectable({ providedIn: 'root' })
export class PostsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPosts()` */
  static readonly GetPostsPath = '/Posts/getPosts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosts$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Plain$Response(params?: GetPosts$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetPostsResponse>> {
    return getPosts$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPosts$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Plain(params?: GetPosts$Plain$Params, context?: HttpContext): Observable<GetPostsResponse> {
    return this.getPosts$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetPostsResponse>): GetPostsResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Response(params?: GetPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<GetPostsResponse>> {
    return getPosts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPosts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts(params?: GetPosts$Params, context?: HttpContext): Observable<GetPostsResponse> {
    return this.getPosts$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetPostsResponse>): GetPostsResponse => r.body)
    );
  }

  /** Path part for operation `findPostById()` */
  static readonly FindPostByIdPath = '/Posts/findPost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPostById$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById$Plain$Response(params?: FindPostById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FindPostResponse>> {
    return findPostById$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPostById$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById$Plain(params?: FindPostById$Plain$Params, context?: HttpContext): Observable<FindPostResponse> {
    return this.findPostById$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FindPostResponse>): FindPostResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPostById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById$Response(params?: FindPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<FindPostResponse>> {
    return findPostById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPostById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPostById(params?: FindPostById$Params, context?: HttpContext): Observable<FindPostResponse> {
    return this.findPostById$Response(params, context).pipe(
      map((r: StrictHttpResponse<FindPostResponse>): FindPostResponse => r.body)
    );
  }

  /** Path part for operation `updatePost()` */
  static readonly UpdatePostPath = '/Posts/updatePost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updatePost$Plain$Response(params?: UpdatePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdatePostResponse>> {
    return updatePost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updatePost$Plain(params?: UpdatePost$Plain$Params, context?: HttpContext): Observable<UpdatePostResponse> {
    return this.updatePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdatePostResponse>): UpdatePostResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updatePost$Response(params?: UpdatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdatePostResponse>> {
    return updatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updatePost(params?: UpdatePost$Params, context?: HttpContext): Observable<UpdatePostResponse> {
    return this.updatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdatePostResponse>): UpdatePostResponse => r.body)
    );
  }

  /** Path part for operation `addPost()` */
  static readonly AddPostPath = '/Posts/addPost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPost$Plain$Response(params?: AddPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AddPostResponse>> {
    return addPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPost$Plain(params?: AddPost$Plain$Params, context?: HttpContext): Observable<AddPostResponse> {
    return this.addPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AddPostResponse>): AddPostResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPost$Response(params?: AddPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AddPostResponse>> {
    return addPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPost(params?: AddPost$Params, context?: HttpContext): Observable<AddPostResponse> {
    return this.addPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AddPostResponse>): AddPostResponse => r.body)
    );
  }

  /** Path part for operation `deletePost()` */
  static readonly DeletePostPath = '/Posts/deletePost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deletePost$Plain$Response(params?: DeletePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteResponse>> {
    return deletePost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deletePost$Plain(params?: DeletePost$Plain$Params, context?: HttpContext): Observable<DeleteResponse> {
    return this.deletePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteResponse>): DeleteResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deletePost$Response(params?: DeletePost$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteResponse>> {
    return deletePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deletePost(params?: DeletePost$Params, context?: HttpContext): Observable<DeleteResponse> {
    return this.deletePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteResponse>): DeleteResponse => r.body)
    );
  }

}
