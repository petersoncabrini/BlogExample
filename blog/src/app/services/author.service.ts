import { EventEmitter, Injectable, Output, ɵɵsetComponentScope } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorLogin } from '../models/Author/AuthorLogin';
import { AuthorRegister } from '../models/Author/AuthorRegister';
import { AuthorLoginResponse } from '../models/Author/AuthorLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://localhost:5248/api/author/';
  public storage;

  constructor(private http: HttpClient) { this.storage = localStorage }

  login(request: AuthorLogin) {
    return this.http.post<AuthorLoginResponse>(this.apiUrl + "login", request)
  }

  register(request: AuthorRegister) {
    return this.http.post<any>(this.apiUrl + 'register', request);
  }

  logout() {
    this.storage.clear();
  }

  get isAuthenticated(): boolean {
    const token = this.storage.getItem('token');
    if (token)
      return true;
    else
      return false;
  }

  get userName() {
    const name = this.storage.getItem('name');
    return name;
  }

  get userId() {
    return this.storage.getItem('authorId')
  }

}
