import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SectionDishesComponent } from '../../components/section-dishes/section-dishes.component';
import { IDishes } from '../../../../domain/model/dishes.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DeleteDishUseCase } from '../../../../application/dishes/delete-dish.usecase';
import { CreateDishUseCase } from '../../../../application/dishes/create-dish.usecase';
import { EditDishUseCase } from '../../../../application/dishes/edit-dish.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetDishUseCase } from '../../../../application/dishes/get-dishes.usescase';

@Component({
  selector: 'lib-section-dishes-content',
  imports: [SectionDishesComponent, CommonModule],
  templateUrl: './section-dishes-content.component.html',
})
export class SectionDishesContentComponent implements OnInit, OnDestroy {
  private readonly _deleteDishUseCase = inject(DeleteDishUseCase);
  private readonly _createDishUseCase = inject(CreateDishUseCase);
  private readonly _editDishUseCase = inject(EditDishUseCase);
  private readonly _getDishUseCase = inject(GetDishUseCase);
  private readonly _formBuilder = inject(FormBuilder);

  dishes$: Observable<IDishes[]>;
  isModalOpen = false;
  modalType: 'add' | 'edit' | 'delete' = 'add';
  selectedDish: IDishes | null = null;

  dishForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0)]],
    menuName: ['', [Validators.required, Validators.minLength(0)]],
  });

  formData = [
    { labelName: 'Name', valueLabel: 'name' },
    { labelName: 'Price', valueLabel: 'price' },
    { labelName: 'Menu name', valueLabel: 'menuName' },
  ];

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
    this.dishForm.reset();
  }

  openEditModal(dish: IDishes): void {
    this.modalType = 'edit';
    this.isModalOpen = true;
    this.selectedDish = dish;
    this.dishForm.patchValue(dish);
  }

  openDeleteModal(dish: IDishes): void {
    this.modalType = 'delete';
    this.isModalOpen = true;
    this.selectedDish = dish;
  }

  onSave(): void {
    if (this.dishForm.valid) {
      if (this.modalType === 'add') {
        this._createDishUseCase.execute(this.dishForm.value);
      } else if (this.modalType === 'edit' && this.selectedDish) {
        const updatedDish = { ...this.selectedDish, ...this.dishForm.value }
        this._editDishUseCase.execute(updatedDish);
        console.log(this.selectedDish)
      }
      this.closeModal();
    }
  }

  deleteDish(): void {
    if (this.selectedDish) {
      this._deleteDishUseCase.execute(this.selectedDish);
      this.closeModal();
  }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDish = null;
    this.dishForm.reset();
  }

  ngOnDestroy(): void {
    this._getDishUseCase.destroySubscriptions();
    this._createDishUseCase.destroySubscriptions();
    this._editDishUseCase.destroySubscriptions();
    this._deleteDishUseCase.ngOnDestroy();
  }

}
