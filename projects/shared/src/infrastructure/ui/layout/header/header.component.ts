import { Component, inject, OnInit } from '@angular/core';
import { LogOutUseCase } from 'users';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly _logOutUseCase = inject(LogOutUseCase);
  emailUser: string = '';

  ngOnInit(): void {
    this.emailUser = localStorage.getItem('email') ?? '';
  }

  logout() {
    this._logOutUseCase.execute();
  }

}