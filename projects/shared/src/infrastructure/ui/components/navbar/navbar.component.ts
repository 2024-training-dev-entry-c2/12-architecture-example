import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() logo!: { url: string; src: string; alt: string };
  @Input() navLinks: { name: string; path: string; ariaLabel: string }[] = [];
}
