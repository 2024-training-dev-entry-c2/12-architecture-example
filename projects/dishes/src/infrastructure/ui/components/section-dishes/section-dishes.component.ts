import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDishes } from '../../../../domain/model/dishes.model';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from "shared";
import { AddModalComponent } from '../../forms/add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';

@Component({
  selector: 'lib-section-dishes',
  imports: [CommonModule, ModalComponent, AddModalComponent, RemoveModalComponent],
  templateUrl: './section-dishes.component.html',
  styleUrl: './section-dishes.component.scss'
})
export class SectionDishesComponent {
  // @Input() dishes: IDishes[] = [];
  // @Input() isModalOpen = false;
  // @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
  // @Input() selectedDish: IDishes | null = null;
  // @Input() dishForm!: FormGroup;
  // @Input() formData!: { labelName: string; valueLabel: string }[];

  // @Output() addDish = new EventEmitter<void>();
  // @Output() editDish = new EventEmitter<IDishes>();
  // @Output() deleteDish = new EventEmitter<IDishes>();
  // @Output() saveDish = new EventEmitter<void>();
  // @Output() confirmDelete = new EventEmitter<void>();
  // @Output() closeModal = new EventEmitter<void>();

  // readonly tableHeaders = [
  //   'ID Dish',
  //   'Name',
  //   'Price',
  //   'Menu Name',
  //   'Total Ordered',
  //   'Dish Type',
  //   'Actions',
  // ];

  // onOpenAddModal(): void {
  //   this.addDish.emit();
  // }

  // onOpenEditModal(dish: IDishes): void {
  //   this.editDish.emit(dish);
  // }

  // onOpenDeleteModal(dish: IDishes): void {
  //   this.deleteDish.emit(dish);
  // }

  // onSave(): void {
  //   this.saveDish.emit();
  // }

  // onDelete(): void {
  //   this.confirmDelete.emit();
  // }

  // onCloseModal(): void {
  //   this.closeModal.emit();
  // }

  @Input() dishes: IDishes[] = [];
  @Input() isModalOpen = false;
  @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
  @Input() selectedDish: IDishes | null = null;

  @Output() addDish = new EventEmitter<void>();
  @Output() editDish = new EventEmitter<IDishes>();
  @Output() deleteDish = new EventEmitter<IDishes>();
  @Output() saveDish = new EventEmitter<any>();
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  tableHeaders = [
    'ID Dish',
    'Name',
    'Price',
    'Menu Name',
    'Total Ordered',
    'Dish Type',
    'Actions',
  ];

  onOpenAddModal(): void {
    this.addDish.emit();
  }

  onOpenEditModal(dish: IDishes): void {
    this.editDish.emit(dish);
  }

  onOpenDeleteModal(dish: IDishes): void {
    this.deleteDish.emit(dish);
  }

  onSave(formValue: any): void {
    this.saveDish.emit(formValue);
  }

  onDelete(): void {
    this.confirmDelete.emit();
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

}
