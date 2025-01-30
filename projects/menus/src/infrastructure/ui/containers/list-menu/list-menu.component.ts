import { Component, inject } from '@angular/core';
import { GetMenusListUseCase } from '../../../../application/menus/list-menus.usecase';
import { IDish, RemoveDishUsecase } from 'dishes';
import { IMenu } from '../../../../domain/model/menu.model';
import { TableCardComponent } from '../../components/table-card/table-card.component';
import { RemoveMenuUsecase } from '../../../../application/menus/remove-menus.usecase';

@Component({
  selector: 'lib-list-menu',
  imports: [TableCardComponent],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css',
})
export class ListMenuComponent {
  private readonly __useCaseMenus = inject(GetMenusListUseCase);
  private readonly __useCaseRemoveMenus = inject(RemoveMenuUsecase);
  private readonly __useCaseRemoveDish = inject(RemoveDishUsecase);
  menus: any[] = [];
  dish: IDish[] = [];
  ngOnInit(): void {
    this.__useCaseMenus.initSubscriptions();
    this.getMenus();
  }
  getMenus() {
    this.__useCaseMenus.execute();

    this.__useCaseMenus.menus$().subscribe({
      next: (menus: IMenu[]) => {
        this.menus = menus.map((menu) => ({ id: menu.id, name: menu.name }));
        this.dish =  menus.flatMap(menu => menu.dishfoods.map((dish: any) => ({ ...dish })));
      },
      error: (err) => {
        console.error('Error al obtener menús:', err);
      },
    });
  }

  removeMenu(id: number) {
    this.__useCaseRemoveMenus.execute(id);
    setTimeout(() => {
      this.getMenus();
    }, 500);
  }
  removeDish(id: number) {
    this.__useCaseRemoveDish.execute(id);
    setTimeout(() => {
      this.getMenus();
    }, 500);
  }
}
