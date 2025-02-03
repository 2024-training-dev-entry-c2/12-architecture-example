import { Component, input } from '@angular/core';
import { IUser } from '../../../../domain/model/users.model';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public user = input<IUser>();
}
