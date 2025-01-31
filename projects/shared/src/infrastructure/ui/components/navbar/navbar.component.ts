import { Component, Input } from '@angular/core';
import { LinkComponent } from '../link/link.component';
import { Link } from '../../../../domain/model/link.model';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() links: Link[] = [];
}
