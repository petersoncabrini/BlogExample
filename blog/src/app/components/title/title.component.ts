import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  isDarkMode: boolean;

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
