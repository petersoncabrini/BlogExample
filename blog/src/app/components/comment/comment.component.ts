import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/Comment/Comment';
import { CommentResponse } from 'src/app/models/Comment/CommentResponse';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss', 'comment.responsive.component.scss']
})
export class CommentComponent implements OnInit {

  postId: string = '';
  comments: CommentResponse[];
  commentContent: string = '';

  constructor(private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getComments()
  }

  getComments() {
    this.commentService.list(this.postId).subscribe(r => {
      this.comments = r;
      console.log(this.comments)
    })
  }

  saveComment() {
    let request = new Comment();
    request.authorId = this.authService._authorId;
    request.postId = this.postId;
    request.content = this.commentContent;

    this.commentService.save(request).subscribe({
      next: (res) => {
        this.alertService.openSnackBar('Comment added successfully', 'Ok');
        this.commentContent = '';
        this.getComments();
      },
      error: (err) => {
      }
    })
  }

  deleteComment(commentId: string) {
    debugger
    this.alertService.openDialog('Are you sure you want to delete this comment?').afterClosed().subscribe((res: boolean) => {
      if (res)
        this.commentService.delete(commentId).subscribe(r => {
          this.alertService.openSnackBar('Comment deleted successfully', 'Ok');
          this.getComments();
        })
    });


  }



}
