import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Link } from '../../../../domain/model/link.interface';

@Component({
  selector: 'lib-navbar-container',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './navbar-container.component.html',
})
export class NavbarContainerComponent {

  @Input() links: Link[] = [];

}
