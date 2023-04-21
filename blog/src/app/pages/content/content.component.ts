import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  subscription: Subscription;
  post: Post;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id']
      this.getPost(id);
    })
  }

  getPost(id: string) {
    this.postService.get(id).subscribe(r => {
      this.post = r;
    })
  }

  onBackButtonClick() {
    this.location.back();
  }

}
