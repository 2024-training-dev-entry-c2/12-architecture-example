import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SectionDishesComponent } from '../../components/section-dishes/section-dishes.component';
import { IDishes } from '../../../../domain/model/dishes.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DeleteDishUseCase } from '../../../../application/dishes/delete-dish.usecase';
import { CreateDishUseCase } from '../../../../application/dishes/create-dish.usecase';
import { EditDishUseCase } from '../../../../application/dishes/edit-dish.usecase';
import { GetDishUseCase } from '../../../../application/dishes/get-dishes.usescase';

@Component({
  selector: 'lib-section-dishes-content',
  imports: [SectionDishesComponent, CommonModule],
  templateUrl: './section-dishes-content.component.html',
})
export class SectionDishesContentComponent {

  dishes$: Observable<IDishes[]>;
  isModalOpen = false;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  selectedDish: IDishes | null = null;

  editData: any = null;

  constructor(
    private readonly _deleteDishUseCase: DeleteDishUseCase,
    private readonly _createDishUseCase: CreateDishUseCase,
    private readonly _editDishUseCase: EditDishUseCase,
    private readonly _getDishUseCase: GetDishUseCase
  ) {}

  ngOnInit(): void {
    this.dishes$ = this._getDishUseCase.dish$();
    this._getDishUseCase.execute();
    this._getDishUseCase.initSubscriptions();
    this._createDishUseCase.initSubscriptions();
    this._editDishUseCase.initSubscriptions();
    this._deleteDishUseCase.initSubscriptions();
  }

  openAddModal(): void {
    this.modalType = 'add';
    this.isModalOpen = true;
    this.selectedDish = null;
  }

  openEditModal(dish: IDishes): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedDish = dish;
    this.editData = dish; // GUARDAR LA VARIABLEEEEEEEEEEEEEEEEEEEEE
    console.log(this.editData)
  }

    openDeleteModal(dish: IDishes): void {
      this.modalType = 'delete';
      this.isModalOpen = true;
      this.selectedDish = dish;
    }

    deleteDish(): void {
      if (this.selectedDish) {
        this._deleteDishUseCase.execute(this.selectedDish);
        this.closeModal();
    }
    }

  onSave(formValue: any): void {
    if (this.modalType === 'add') {
      this._createDishUseCase.execute(formValue);
    } else if (this.modalType === 'edit' && this.selectedDish) {
      const updatedDish = { ...this.selectedDish, ...formValue };
      this._editDishUseCase.execute(updatedDish);
    }
    this.closeModal();
  }

  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDish = null;
    this.editData = null;
  }

  OnDestroy(): void {
    this._getDishUseCase.destroySubscriptions();
    this._createDishUseCase.destroySubscriptions();
    this._editDishUseCase.destroySubscriptions();
    this._deleteDishUseCase.ngOnDestroy();

  }

}
