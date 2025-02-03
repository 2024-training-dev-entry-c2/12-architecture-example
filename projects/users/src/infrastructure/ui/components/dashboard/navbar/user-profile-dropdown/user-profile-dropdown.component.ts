import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { AuthSharedService } from 'shared';

@Component({
  selector: 'lib-user-profile-dropdown',
  imports: [],
  templateUrl: './user-profile-dropdown.component.html',
  styleUrl: './user-profile-dropdown.component.scss'
})
export class UserProfileDropdownComponent implements OnInit, OnDestroy {

  private readonly authService = inject(AuthSharedService);
  userEmail: string | null = null;
  private userEmailSubscription: Subscription | undefined;

  constructor(//private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userEmailSubscription = this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  ngOnDestroy(): void {
    if (this.userEmailSubscription) {
      this.userEmailSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['app/login']);
  }
}
