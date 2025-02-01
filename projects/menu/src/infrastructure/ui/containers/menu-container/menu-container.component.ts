import { Component, inject, OnChanges, OnDestroy, OnInit, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {  Observable } from 'rxjs';
import { IMenu } from '../../../../domain/model/menus.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListMenusUseCase } from '../../../../application/menus/list-menus.usecase';
import { MainComponent } from "../../components/main/main.component";
import { MenuHeaderComponent } from "../../components/menu-header/menu-header.component";
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usecase';
import { ShareComponent } from 'shared';
import { SearchMenusUseCase } from '../../../../application/menus/search-menu.usecase';
import { DeleteMenuUseCase } from '../../../../application/menus/delete-menu.usecase';
import { UpdateMenuUseCase } from '../../../../application/menus/update-menu.usecase';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "shared";
import { MenuFormComponent } from '../../forms/menu-form/menu-form.component';


@Component({
  selector: 'lib-menu-container',
  imports: [MainComponent, AsyncPipe, MenuHeaderComponent, ShareComponent, CommonModule, FormsModule, ModalComponent, MenuFormComponent],
  templateUrl: './menu-container.component.html'
})
export class MenuContainerComponent implements OnInit, OnDestroy {
  private readonly _listUsecase = inject(ListMenusUseCase);
  private readonly _createUsecase = inject(CreateMenuUseCase);
  private readonly _searchUsecase = inject(SearchMenusUseCase);
  private readonly _deleteUsecase = inject(DeleteMenuUseCase);
  private readonly _updateUsecase = inject(UpdateMenuUseCase);

  public menu$: Observable<IMenu[]>;

  public isModalOpen = signal<boolean>(false);
  public selectedMenuId = signal<number | null>(null);

  public modalTitle: string = '';
  public modalContent: string = '';
  public modalButton: string = '';

  public currentMenuName = '';
  public menuName = '';
  public modalType: string = '';

  @ViewChild(MenuFormComponent) menuEditForm!: MenuFormComponent;

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadMenus();
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
    this.modalTitle = 'Confirmar Eliminacion';
    this.modalButton = 'Confirmar';
    this.modalType = 'delete';
    this.isModalOpen.set(true);
  }

  openEditModal(menu: IMenu): void {
    this.selectedMenuId.set(menu.idMenu);
    this.modalTitle = 'Editar Menu';
    this.modalButton = 'Actualizar';
    this.currentMenuName = menu.menuName;
    this.modalType = 'edit';
    this.isModalOpen.set(true);
  }

  confirmModal(): void {
    if (this.modalType === 'delete') {
      this.deleteMenu();
    } else  if (this.modalType === 'edit' && this.menuEditForm) {
      const updatedMenu = this.menuEditForm.getFormData();
      if (updatedMenu) {
        this.updateMenu(updatedMenu.menuName);
      }
    }
    this.isModalOpen.set(false);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  private deleteMenu(): void {
    const menuId = this.selectedMenuId();
    if (menuId) {
      this._deleteUsecase.deleteMenu(menuId).subscribe(() => {
        this.loadMenus();
      });
    }
  }

  updateMenu(updatedMenuName: string): void {
    const menuId = this.selectedMenuId();
    if (menuId && updatedMenuName) {
      this._updateUsecase.updateMenu(menuId, updatedMenuName, this.menu$).subscribe(() => {
        this.loadMenus();
      });
    }
  }

}
