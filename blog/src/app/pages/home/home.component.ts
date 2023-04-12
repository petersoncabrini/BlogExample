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
  hasPosts: boolean = false;
  seeMore: boolean = false;
  smallPosts: Post[] = [];


  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getList().subscribe(r => {
      if (r.length > 0) {
        this.mainPost = r.shift();
        this.smallPosts = r;
        this.hasPosts = true;

        if (r.length >= 4)
          this.seeMore = true;
      }
    })
  }
}
