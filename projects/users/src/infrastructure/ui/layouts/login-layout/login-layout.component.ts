import { Component } from '@angular/core';
import { LoginCoverComponent } from '../../components/login-cover/login-cover.component';
import { RouterOutlet } from '@angular/router';
import { LoaderContainerComponent, ToastContainerComponent } from 'shared';

@Component({
  selector: 'lib-login-layout',
  imports: [
    LoginCoverComponent,
    RouterOutlet,
    LoaderContainerComponent,
    ToastContainerComponent,
  ],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
})
export class LoginLayoutComponent {}
