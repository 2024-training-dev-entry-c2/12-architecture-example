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
  imports: [SectionMenusComponent, CommonModule],
  templateUrl: './section-menus-content.component.html',
})
export class SectionMenusContentComponent {
  private readonly _deleteMenuUseCase = inject(DeleteMenuUseCase);
  private readonly _createMenuUseCase = inject(CreateMenuUseCase);
  private readonly _editMenuUseCase = inject(EditMenuUseCase);
  private readonly _getMenuUseCase = inject(GetMenusUseCase);
  private readonly _formBuilder = inject(FormBuilder);

  menus$: Observable<IMenu[]>;
  isModalOpen = false;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  selectedMenu: IMenu | null = null;

  menuForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name', type: 'text' },
    { labelName: 'Description', valueLabel: 'description', type: 'text' },
  ];

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
    this.isModalOpen = true;
    this.selectedMenu = null;
    this.menuForm.reset();
  }

  openEditModal(menu: IMenu): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedMenu = menu;
    this.menuForm.patchValue(menu);
  }

  openDeleteModal(menu: IMenu): void {
    this.modalType = 'delete';
    this.isModalOpen = true;
    this.selectedMenu = menu;
  }

  onSave(): void {
    if (this.menuForm.valid) {
      if (this.modalType === 'add') {
        this._createMenuUseCase.execute(this.menuForm.value);
      } else if (this.modalType === 'edit' && this.selectedMenu) {
        const updatedMenu = { ...this.selectedMenu, ...this.menuForm.value }
        this._editMenuUseCase.execute(updatedMenu);
        console.log(this.selectedMenu)
      }
      this.closeModal();
    }
  }

  deleteMenu(): void {
    if (this.selectedMenu) {
      this._deleteMenuUseCase.execute(this.selectedMenu);
      this.closeModal();
  }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMenu = null;
    this.menuForm.reset();
  }

  ngOnDestroy(): void {
    this._getMenuUseCase.destroySubscriptions();
    this._createMenuUseCase.destroySubscriptions();
    this._editMenuUseCase.destroySubscriptions();
    this._deleteMenuUseCase.ngOnDestroy();
  }

}
