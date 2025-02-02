import { Injectable } from '@angular/core';
import { IAdmin } from 'auth';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  setAdmin(admin: IAdmin) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  getAdmin(): IAdmin | null {
    return JSON.parse(localStorage.getItem('admin'));
  }

  removeAdmin() {
    localStorage.removeItem('admin');
  }
}
