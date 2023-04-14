import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostCategory, PostCategoryLabelMapping } from 'src/app/enums/PostCategory';
import { Post } from 'src/app/models/Post/Post';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent {

  post = {
    title: '',
    description: '',
    content: '',
    category: 0,
  };

  formValid: boolean = false;
  imageUrl: string;
  fileBase64: string;
  tipoArquivo: string;
  categories: number[] = Object.values(PostCategory).filter(value => typeof value === 'number') as number[];
  categoryLabelMapping = PostCategoryLabelMapping;

  constructor(private postService: PostService,
    private authService: AuthService,
    private router: Router) {
  }


  onSubmit() {
    let request = new Post();
    request.title = this.post.title;
    request.description = this.post.description;
    request.content = this.post.content;
    request.category = +this.post.category;
    request.authorName = this.authService.userName;
    request.authorId = this.authService.userId;
    request.image = this.fileBase64;
    request.createdAt = Date.now.toString()

    this.postService.save(request).subscribe(r => {
      this.router.navigate(['/']);
    })

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
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imageUrl = reader.result as string;
      this.fileBase64 = reader.result?.toString().split('base64,')[1];
      console.log(this.fileBase64)
    };
  }

}
