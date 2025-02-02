import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() logoutRequested = new EventEmitter<void>();

  onLogout(): void {
    this.logoutRequested.emit();
  }
}
