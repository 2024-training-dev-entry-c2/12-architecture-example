import { Component, inject } from '@angular/core';
import { NavComponent } from "../../layouts/nav/nav.component";
import { Router } from '@angular/router';
import { AuthUserService } from 'users';
//import { AuthUserService } from 'users';

@Component({
  selector: 'lib-nav-container',
  imports: [NavComponent],
  templateUrl: './nav-container.component.html',
})
export class NavContainerComponent {
  private router = inject(Router);
  private authService = inject(AuthUserService);

  handleLogout() {
    this.authService.removeToken();
    this.authService.removeUsername();

    this.router.navigate(['/login']);
  }
}
