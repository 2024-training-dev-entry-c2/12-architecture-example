import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() logoutRequested = new EventEmitter<void>();
  faPiggyBank = faPiggyBank;

  onLogout(): void {
    this.logoutRequested.emit();
  }
}