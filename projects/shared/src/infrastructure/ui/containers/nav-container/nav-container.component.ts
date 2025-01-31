import { Component, inject } from '@angular/core';
import { NavComponent } from "../../layouts/nav/nav.component";
import { Router } from '@angular/router';
import { LogOutUsecase } from 'users';

@Component({
  selector: 'lib-nav-container',
  imports: [NavComponent],
  templateUrl: './nav-container.component.html',
})
export class NavContainerComponent {
  private router = inject(Router);
  private readonly _logoutUsecase = inject(LogOutUsecase);
  handleLogout() {
    this._logoutUsecase.execute();
  }
}
