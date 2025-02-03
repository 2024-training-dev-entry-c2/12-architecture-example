import { Component, input } from '@angular/core';
import { IBadge } from '../../interfaces/badge.interface';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  data = input<IBadge>();

}