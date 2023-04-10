import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.responsive.component.scss']
})
export class HomeComponent implements OnInit {

  mainPost: Post;
  smallPosts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getList().subscribe(r => {
      this.mainPost = r.shift();
      this.smallPosts = r;
    })
  }
}
