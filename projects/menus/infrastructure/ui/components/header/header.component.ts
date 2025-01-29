import { Component, input } from '@angular/core';
import { IUser } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public user = input<IUser>();
}
