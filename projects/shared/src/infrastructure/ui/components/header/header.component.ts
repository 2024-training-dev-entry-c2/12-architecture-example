import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'lib-header',
  imports: [MenuComponent , UserComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public iconUrl = input<string>();
}
