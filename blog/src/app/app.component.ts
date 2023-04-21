import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'blog';

  constructor() {
  }

  ngOnInit(): void {

  }
}
