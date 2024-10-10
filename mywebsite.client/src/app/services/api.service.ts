import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPostResponse, DeleteRequest, DeleteResponse, FindPostResponse, GetPostsResponse, PostDto, UpdatePostResponse } from '../api/models';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = 'https://localhost:7015'

  constructor(private http: HttpClient) { }


  // Get all posts with given PostType
  async getPosts(type: string) {

    const params = new HttpParams().set('postType', type);

    try {
      const response = await lastValueFrom(this.http.get<GetPostsResponse>(this.api + '/Posts/getPosts', { params }));
      return response;
    } catch (error) {
      console.error('Error fetching posts: ', error);
      throw error;
    }
  }


  // Function that determines whether to call Update method or Add method.
  async additPost(dto: PostDto, isEdit: boolean): Promise<UpdatePostResponse | AddPostResponse> {
    if (isEdit) {
      return await this.updatePost(dto);
    } else {
      return await this.addPost(dto);
    }
  }


  // Update method.
  async updatePost(dto: PostDto) {
    try {
      const response = await lastValueFrom(this.http.put<UpdatePostResponse>(this.api + '/Posts/updatePost', dto, { withCredentials: false }));
      return response;
    } catch (error) {

      console.error('Error updating the post: ', error);
      throw error;
    }
  }

  // Add method.
  async addPost(dto: PostDto) {
    try {
      console.log(dto);
      const response = await lastValueFrom(this.http.post<AddPostResponse>(this.api + '/Posts/addPost', dto, { withCredentials: false }));
      return response;
    } catch (error) {

      console.error('Error adding the post: ', error);
      throw error;
    }
  }

  // Find post by id.
  async findPost(id: string) {
    const params = new HttpParams().set('id', id);
    try {
      const response = await lastValueFrom(this.http.get<FindPostResponse>(this.api + '/Posts/findPost', { params }));
      return response;
    } catch (error) {
      console.log('Error sending the request. ', error);
      throw error;
    }
    
  }

  // Delete post.
  async deletePost(request: DeleteRequest) {
    try {
      const response = await lastValueFrom(this.http.delete<DeleteResponse>(this.api + '/Posts/deletePost', { body: request }))
      return response;
    } catch (error) {
      console.log('Error sending the request. ', error);
      throw error;
    }
  }
}
