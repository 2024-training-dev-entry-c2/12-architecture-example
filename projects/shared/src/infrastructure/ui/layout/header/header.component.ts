import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { delay, of, tap } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';
import { LogOutUseCase } from 'users';

@Component({
  selector: 'app-header',
  imports: [LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly _logOutUseCase = inject(LogOutUseCase);

  username = localStorage.getItem('email');
  showLogout = false;
  loader: boolean = false;

  constructor(private router: Router) {}

  toggleLogout(event: Event) {
    event.stopPropagation();
    this.showLogout = !this.showLogout;
  }

  logout() {
    of(1)
      .pipe(
        tap(() => (this.loader = true)),
        delay(1000),
        tap(() => {
          this._logOutUseCase.execute();
          this.loader = false;
        })
      )
      .subscribe();
  }
}
