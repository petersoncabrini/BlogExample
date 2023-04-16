import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss', 'small-card.responsive.component.scss']
})
export class SmallCardComponent {
  @Input() cover: string = '';
  @Input() createdAt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() id: string = '';
}
