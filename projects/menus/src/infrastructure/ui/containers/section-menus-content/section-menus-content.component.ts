import { OnDestroy } from '@angular/core';
import { Component, inject } from '@angular/core';
import { SectionMenusComponent } from '../../components/section-menus/section-menus.component';
import { IMenu } from '../../../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { GetMenusUseCase } from '../../../../application/menus/get-menus.usecase';
import { DeleteMenuUseCase } from '../../../../application/menus/delete-menu.usecase';
import { CreateMenuUseCase } from '../../../../application/menus/create-menu.usercase';
import { EditMenuUseCase } from '../../../../application/menus/edit-menu.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-section-menus-content',
  imports: [CommonModule, SectionMenusComponent],
  templateUrl: './section-menus-content.component.html',
})
export class SectionMenusContentComponent {
  menus$: Observable<IMenu[]>;
  isModalOpen = false;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  selectedMenu: IMenu | null = null;

  editData: any = null;

  constructor(
    private readonly _deleteMenuUseCase: DeleteMenuUseCase,
    private readonly _createMenuUseCase: CreateMenuUseCase,
    private readonly _editMenuUseCase: EditMenuUseCase,
    private readonly _getMenuUseCase: GetMenusUseCase
  ) {}

  ngOnInit(): void {
    this.menus$ = this._getMenuUseCase.menu$();
    this._getMenuUseCase.execute();
    this._getMenuUseCase.initSubscriptions();
    this._createMenuUseCase.initSubscriptions();
    this._editMenuUseCase.initSubscriptions();
    this._deleteMenuUseCase.initSubscriptions();
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.selectedMenu = null;
    this.isModalOpen = true;
  }

  openEditModal(menu: IMenu): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedMenu = menu;
    this.editData = menu; // GUARDAR LA VARIABLEEEEEEEEEEEEEEEEEEEEE
    console.log(this.editData);
  }

  openDeleteModal(menu: IMenu): void {
    this.modalType = 'delete';
    this.isModalOpen = true;
    this.selectedMenu = menu;
  }

  deleteMenu(): void {
    if (this.selectedMenu) {
      this._deleteMenuUseCase.execute(this.selectedMenu);
      this.closeModal();
    }
  }

  onSave(formValue: any): void {
    if (this.modalType === 'add') {
      this._createMenuUseCase.execute(formValue);
    } else if (this.modalType === 'edit' && this.selectedMenu) {
      const updatedMenu = { ...this.selectedMenu, ...formValue };
      this._editMenuUseCase.execute(updatedMenu);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMenu = null;
    this.editData = null;
  }

  OnDestroy(): void {
    this._getMenuUseCase.destroySubscriptions();
    this._createMenuUseCase.destroySubscriptions();
    this._editMenuUseCase.destroySubscriptions();
    this._deleteMenuUseCase.ngOnDestroy();
  }


}
