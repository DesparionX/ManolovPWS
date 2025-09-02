import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPostResponse, Cvdto, DeleteMessageResponse, DeleteRequest, DeleteResponse, FindPostResponse, GetMessagesResponse, GetPostsResponse, LoadCvResponse, MessageDto, PostDto, ReadMessageResponse, SendMessageResponse, UpdateCvResponse, UpdatePostResponse } from '../api/models';
import { Observable, delay, lastValueFrom, retry } from 'rxjs';
import { environment } from '../../environmets/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /*api = environment.apiUrl;*/
  api = "https://manolov.up.railway.app";

  constructor(private http: HttpClient) { }


  // Get all posts with given PostType
  async getPosts(type: string) {

    const params = new HttpParams().set('postType', type);

    try {
      const response = await lastValueFrom(this.http.get<GetPostsResponse>(this.api + '/Posts/getPosts', { params })
        .pipe(retry({ count: 2, delay: 2000 })));

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

  // CV
  // Get the CV.
  async getCv() {
    try {
      const response = await lastValueFrom(this.http.get<LoadCvResponse>(this.api + '/CV/loadCV'))
      return response;
    } catch (error) {
      console.error('Error sending the request.', error);
      throw error;
    }
  }

  // Update CV.
  async updateCV(cv: Cvdto) {
    try {
      const response = await lastValueFrom(this.http.put<UpdateCvResponse>(this.api + '/CV/updateCV', cv, { withCredentials: false }));
      return response;
    } catch (error) {
      console.error('Error updating the CV.', error)
      throw error;
    }
  }

  // MESSAGES
  // Send message.

  async sendMessage(message: MessageDto) {
    try {
      const response = await lastValueFrom(this.http.post<SendMessageResponse>(this.api + '/Messages/sendMessage', message, { withCredentials: false }));
      return response;
    } catch (error) {
      console.error('Error sending the message.', error)
      throw error;
    }
  }

  // Get all messages.
  async getAllMessages() {
    try {
      const response = await lastValueFrom(this.http.get<GetMessagesResponse>(this.api + '/Messages/getAllMessages'));
      return response;
    } catch (error) {
      console.error('Error getting the messages.', error);
      throw error;
    }
  }

  // Get message by id.
  async getMessageById(id: string) {
    const params = new HttpParams().set('id', id);
    try {
      const response = await lastValueFrom(this.http.get<ReadMessageResponse>(this.api + '/Messages/readMessage', { params }))
      return response;
    } catch (error) {
      console.error('Error getting the message.', error);
      throw error
    }
  }

  // Delete message.
  async deleteMessage(id: string) {
    const params = new HttpParams().set('id', id);
    try {
      const response = await lastValueFrom(this.http.delete<DeleteMessageResponse>(this.api + '/Messages/deleteMessage', { params }))
      return response;
    } catch (error) {
      console.error('Error deleting the message.', error);
      throw error
    }
  }
}
