import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'lib-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  isCollapsed = false;
  user = inject(AuthService);
  menuService = inject(MenuService);

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout(): void {
    //usar usea case - -- this.user.logout();
  }

  selectMenu(menu: string): void {
    this.menuService.setSelectedMenu(menu); // Actualiza el menú seleccionado
  }
}
