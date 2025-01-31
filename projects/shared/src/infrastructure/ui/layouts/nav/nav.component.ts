import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  showMenu = false;
  @Output() toggleSidebar = new EventEmitter<void>()
  @Output() logoutClicked = new EventEmitter<void>();

  constructor(private router: Router,
  ) { }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click')
  hideMenu() {
    this.showMenu = false;
  }

  logout() {
    this.logoutClicked.emit();
  }
}
