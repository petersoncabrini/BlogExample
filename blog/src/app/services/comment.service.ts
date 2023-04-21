import { EventEmitter, Injectable, Output, ɵɵsetComponentScope } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorLogin } from '../models/Author/AuthorLogin';
import { AuthorRegister } from '../models/Author/AuthorRegister';
import { AuthorLoginResponse } from '../models/Author/AuthorLoginResponse';
import { CommentResponse } from '../models/Comment/CommentResponse';
import { Comment } from '../models/Comment/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:5248/api/comment/';

  constructor(private http: HttpClient) { }

  list(postId: string) {
    return this.http.get<CommentResponse[]>(this.apiUrl + "list/" + postId)
  }

  save(request: Comment) {
    return this.http.post<any>(this.apiUrl + 'save', request);
  }

  delete(id: string) {
    return this.http.delete<any>(this.apiUrl + 'delete/' + id);
  }

}
