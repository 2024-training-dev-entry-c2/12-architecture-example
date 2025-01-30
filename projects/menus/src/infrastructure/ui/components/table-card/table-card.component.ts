import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDishResponse } from 'dishes';
import { IMenu } from '../../../../domain/model/menu.model';
import { ButtonsComponent, TableComponent } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-table-card',
  imports: [ButtonsComponent, TableComponent],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.scss',
})
export class TableCardComponent {
  @Input() getTabs: { id: number; name: string }[] = [];
  @Input() dishfoods: any[] = [];
  @Output() deleteMenuData = new EventEmitter<number>();

  activeTab = 0;

  ngOnInit(): void {}
  images = [
    'assets/icons/form-svgrepo-com.svg#icon-delete',
    'assets/icons/form-svgrepo-com.svg#icon-update',
  ];

  selectTab(index: number): void {
    this.activeTab = index;
  }

  getMenuDishes(menu: string): any[] {
    return this.dishfoods.filter((dish) => dish.menu === menu);
  }

  deleteMenu(id: number) {
    this.deleteMenuData.emit(id);
    alert('Menu Deleted');
  }

  deleteDish(id: number) {}
  constructor(private router: Router) {}
  redirectToMenu(): void {
    this.router.navigate(['menu/add']);
  }

  
  redirectToMenuId(id: number): void {
    this.router.navigate(['/menu', id]); 
  }
}
