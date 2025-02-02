import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  email = input<string>();
  role = input<string>();
}
