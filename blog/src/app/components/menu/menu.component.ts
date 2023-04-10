import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';

  constructor(public authorService: AuthorService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.checkUser();
    this.getUser();
  }

  checkUser() {
    this.isAuthenticated = this.authorService.isAuthenticated;
  }

  getUser() {
    this.userName = this.authorService.userName;
  }

  logout() {
    this.authorService.logout();
    this.router.navigate(['/']);
  }

}
