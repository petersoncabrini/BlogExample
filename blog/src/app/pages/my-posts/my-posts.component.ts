import { Component } from '@angular/core';
import { Post } from 'src/app/models/Post/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent {

  myPosts: Post[];

  constructor(private postService: PostService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts() {
    this.postService.getList().subscribe(r => {
      this.myPosts = r.filter(p => p.authorId == this.authService._authorId);
    })
  }

  delete(id: string) {
    this.postService.delete(id).subscribe(r => {
      this.getMyPosts();
    })
  }

}
