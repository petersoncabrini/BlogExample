import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog';
  isDarkMode: boolean = false;

  constructor(private localStorage: StorageMap) {
  }

  ngOnInit(): void {
    this.watchDarkModeEvent();
  }

  watchDarkModeEvent() {
    this.localStorage.watch('isDarkMode', { type: 'boolean' }).subscribe(r => {
      this.isDarkMode = r;
    })
  }

}
