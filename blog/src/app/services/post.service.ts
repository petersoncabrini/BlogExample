import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:5248/api/post/';

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get<Post>(this.apiUrl + id)
  }

  getList() {
    return this.http.get<Post[]>(this.apiUrl + 'list');
  }

  save(request: Post) {
    return this.http.post<Post>(this.apiUrl + 'save', request);
  }

  delete(id: string) {
    return this.http.delete<any>(this.apiUrl + 'delete/' + id);

  }

}
