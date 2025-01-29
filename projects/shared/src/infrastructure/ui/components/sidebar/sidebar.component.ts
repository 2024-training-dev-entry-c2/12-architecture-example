import { Component, Input } from '@angular/core';
import { NavbarContainerComponent } from "../../container/navbar-container/navbar-container.component";
import { Link } from '../../../../domain/model/link.interface';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [NavbarContainerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() links: Link[] = [];
}
