import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent {
  isDarkMode: boolean = false;

  constructor(private localStorage: StorageMap) {
    this.localStorage.get('isDarkMode').subscribe((value: any) => {
      if (value) {
        this.isDarkMode = value;
        this.toggleDarkMode();
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.localStorage.set('isDarkMode', this.isDarkMode).subscribe();
  }
}
