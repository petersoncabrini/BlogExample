import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getList().subscribe(r => {
      this.posts = r;
    })
  }
}
