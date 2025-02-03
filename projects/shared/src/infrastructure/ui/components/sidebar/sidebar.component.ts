import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Link } from '../../../../domain/model/link.model';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() links: Link[] = [];
}
