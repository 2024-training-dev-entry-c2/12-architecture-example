import { Component, inject, OnChanges, OnDestroy, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListMenusUseCase } from '../../../../application/menus/list-menus.usecase';
import { MainComponent } from "../../components/main/main.component";
import { MenuHeaderComponent } from "../../components/menu-header/menu-header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';
import { ShareComponent, ModalService } from 'shared';
import { SearchMenusUseCase } from '../../../../application/menus/search-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/menus/delete-menu.usecase';
import { UpdateMenuUseCase } from '../../../../application/menus/update-menu.usecase';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'lib-menu-container',
  imports: [MainComponent, AsyncPipe, MenuHeaderComponent, ShareComponent, CommonModule, FormsModule],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _listUsecase = inject(ListMenusUseCase);
  private readonly _createUsecase = inject(CreateMenuUseCase);
  private readonly _searchUsecase = inject(SearchMenusUseCase);
  private readonly _deleteUsecase = inject(DeleteMenuUseCase);
  private readonly _updateUsecase = inject(UpdateMenuUseCase);
  private readonly _modalService = inject(ModalService);
  
  public menu$: Observable<IMenu[]>;
  public isModalOpen = signal<boolean>(false);
  public selectedMenuId = signal<number | null>(null);

  public currentMenuName = '';
  public menuName = '';
  public modalType: string = '';

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  @ViewChild('deleteModalTemplate') deleteModalTemplate!: TemplateRef<any>;
  private menuIdToDelete!: number;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadMenus();
    // this.menu$ = this._listUsecase.menu$();
    this.menu$ = this._searchUsecase.filteredMenus$(); 
}

  ngOnDestroy(): void {
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
  }

  loadMenus(): void {
    this._listUsecase.loadMenus();
  }
 
  addMenu(menu: IMenu): void {
    this._createUsecase.addMenu(menu);
    
  }

  updateSearchQuery(query: string): void {
    this._searchUsecase.setSearchQuery(query);
  }

  openDeleteModal(idMenu: number): void {
    this.selectedMenuId.set(idMenu);
    this.modalType = 'delete';
    this._modalService.open(this.modalTemplate, this.viewContainerRef, {
      title: 'Confirmar Eliminación',
      buttonName: 'Eliminar'
    }).subscribe((response) => {
      if (response === 'confirm') {
        this.deleteMenu();
      }
    });
  }

  openEditModal(menu: IMenu): void {
    this.currentMenuName = menu.menuName;
    this.menuName = menu.menuName;
    this.selectedMenuId.set(menu.idMenu);
    this.modalType = 'edit';
    this._modalService.open(this.modalTemplate, this.viewContainerRef, {
      title: 'Editar Menu',
      buttonName: 'Actualizar'
    }).subscribe((response) => {
      if (response === 'confirm') {
        this.updateMenu();
      }
    });
  }

  private deleteMenu(): void {
    const menuId = this.selectedMenuId();
    if (menuId) {
      this._deleteUsecase.deleteMenu(menuId).subscribe(() => {
        this.loadMenus();
      });
    }
  }

  private updateMenu(): void {
    const menuId = this.selectedMenuId();
    if (menuId && this.menuName) {
      const updatedMenu: IMenu = {
        idMenu: menuId,
        menuName: this.menuName,
        dishes: [] 
      };
      this._updateUsecase.updateMenu(updatedMenu).subscribe(() => {
        this.loadMenus();
      });
    }
  }
  
}
