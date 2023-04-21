import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

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

  constructor(public authService: AuthService) {
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

}
