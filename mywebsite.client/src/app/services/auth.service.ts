import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { LogOutResponse, LoginResponse, LoginUserRequest } from '../api/models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService, private http: HttpClient) { }


  // Login
  
  async logIn(request: LoginUserRequest) {
    try {
      const response = await lastValueFrom(this.http.post<LoginResponse>(this.api.api + '/Account/logIn', request, { withCredentials: false }));
      if (response.succeed && response.jwt) {
        localStorage.setItem('token', response.jwt);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Logout.
  async logOut() {
    try {
      const response = await lastValueFrom(this.http.post<LogOutResponse>(this.api.api + '/Account/logOut', { withCredentials: false }))
      if (response.succeed) {
        localStorage.removeItem('token');
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
