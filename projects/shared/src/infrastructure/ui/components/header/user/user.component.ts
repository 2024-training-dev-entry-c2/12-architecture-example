import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  public user = input<string>();
}
