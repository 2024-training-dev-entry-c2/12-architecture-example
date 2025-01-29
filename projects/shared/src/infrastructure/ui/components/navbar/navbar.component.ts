import { Component, Input } from '@angular/core';
import { LinkContainerComponent } from "../../container/link-container/link-container.component";
import { Link } from '../../../../domain/model/link.interface';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [LinkContainerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() links: Link[] = [];
}
