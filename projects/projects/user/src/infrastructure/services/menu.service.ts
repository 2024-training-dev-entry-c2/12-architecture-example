import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  selectedMenu = signal<string>('users'); 

  setSelectedMenu(menu: string): void {
    this.selectedMenu.set(menu);
  }
  
}