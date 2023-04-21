import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostCategory, PostCategoryLabelMapping } from 'src/app/enums/PostCategory';
import { Post } from 'src/app/models/Post/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

  post = {
    title: '',
    description: '',
    content: '',
    category: 0,
  };

  subscription: Subscription;
  postId: string = '';

  formValid: boolean = false;
  imageUrl: string;
  fileBase64: string;
  tipoArquivo: string;
  categories: number[] = Object.values(PostCategory).filter(value => typeof value === 'number') as number[];
  categoryLabelMapping = PostCategoryLabelMapping;
  isEdit: boolean = false;

  constructor(private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.postId = params['id']
      this.checkIfEdit();
    })
  }

  checkIfEdit() {
    if (this.postId != undefined) {
      this.isEdit = true;
      this.getPost(this.postId)
    }
  }

  getPost(id: string) {
    this.postService.get(id).subscribe(r => {
      this.post.title = r.title
      this.post.description = r.description;
      this.post.content = r.content;
      this.post.category = r.category;
      this.fileBase64 = r.image;
    })
  }

  publish() {
    let request = new Post();
    request.title = this.post.title;
    request.description = this.post.description;
    request.content = this.post.content;
    request.category = +this.post.category;
    request.authorName = this.authService.userName;
    request.authorId = this.authService.userId;
    request.image = this.fileBase64;
    request.createdAt = Date.now.toString()

    this.postService.save(request).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
      }
    });
  }

  edit() {
    let request = new Post();
    request.id = this.postId
    request.title = this.post.title;
    request.description = this.post.description;
    request.content = this.post.content;
    request.category = +this.post.category;
    request.authorName = this.authService.userName;
    request.authorId = this.authService.userId;
    request.image = this.fileBase64;
    request.createdAt = Date.now.toString()

    this.postService.edit(request).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
      }
    });
  }

  getKeys() {
    return Object.keys(this.categories);
  }

  getCategoryLabel(category: PostCategory) {
    return this.categoryLabelMapping.find(x => x.value == category)?.label;
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file.size > 512 * 1024) { // 512 KB = 512 * 1024 bytes
      return;
    }

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imageUrl = reader.result as string;
      this.fileBase64 = reader.result?.toString().split('base64,')[1];
    };
  }

  onCancelButtonClick() {
    this.location.back();
  }

}
