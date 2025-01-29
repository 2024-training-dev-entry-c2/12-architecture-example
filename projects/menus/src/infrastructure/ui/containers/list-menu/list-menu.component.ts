import { Component, inject } from '@angular/core';
import { GetMenusListUseCase } from '../../../../application/menus/list-menus.usecase';
import { IDishResponse } from 'dishes';
import { IMenuResponse } from '../../../../domain/model/menu.model';
import { TableCardComponent } from '../../components/table-card/table-card.component';

@Component({
  selector: 'lib-list-menu',
  imports: [TableCardComponent],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css',
})
export class ListMenuComponent {
  private readonly __useCaseMenus = inject(GetMenusListUseCase);
  menus: any[] = [];
  dish: IDishResponse[] = [];
  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.getMenus();
  }
  getMenus() {
    this.__useCaseMenus.execute();

    this.__useCaseMenus.menus$().subscribe({
      next: (menus: IMenuResponse[]) => {
        this.menus = menus.map((menu) => ({ id: menu.id, name: menu.name }));
        this.dish =  menus.flatMap(menu => menu.dishfoods.map((dish: any) => ({ ...dish })));
      },
      error: (err) => {
        console.error('Error al obtener menús:', err);
      },
    });
  }
}
