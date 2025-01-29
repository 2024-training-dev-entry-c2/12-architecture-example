import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  //private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    //this.authService.logout();
    this.router.navigate(['/login']);
  }
}
