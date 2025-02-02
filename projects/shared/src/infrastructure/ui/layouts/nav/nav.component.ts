import { Component, EventEmitter,  Output } from '@angular/core';
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

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  hideMenu() {
    this.showMenu = false;
  }

  logout() {
    this.logoutClicked.emit();
  }
}
