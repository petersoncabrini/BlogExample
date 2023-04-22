import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/app/models/Generic/filter';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { PostService } from 'src/app/services/post.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Post } from 'src/app/models/Post/Post';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss', './menu.responsive.component.scss']
})
export class MenuComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';
  showSearch = false;
  innerWidth: any;
  filter: Filter = new Filter();
  searchResults: Post[] = [];

  constructor(public authService: AuthService,
    private postService: PostService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  logout() {
    this.authService.logout();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  findPosts() {
    this.postService.find(this.filter).subscribe(r => {
      this.searchResults = r;
    })
  }

}
