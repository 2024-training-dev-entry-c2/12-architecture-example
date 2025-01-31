import { Component, inject } from '@angular/core';
import { NavComponent } from "../../layouts/nav/nav.component";
import { LogOutUsecase } from 'users';

@Component({
  selector: 'lib-nav-container',
  imports: [NavComponent],
  templateUrl: './nav-container.component.html',
})
export class NavContainerComponent {
  private readonly _logoutUsecase = inject(LogOutUsecase);
  handleLogout() {
    this._logoutUsecase.execute();
  }
}
