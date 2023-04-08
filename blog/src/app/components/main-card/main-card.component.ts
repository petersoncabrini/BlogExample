import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent {

  @Input() cover: string = '';
  @Input() createdAt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id: string = '';
}
