import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menus.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from 'shared';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { RemoveModalComponent } from '../remove-modal/remove-modal.component';

@Component({
  selector: 'lib-section-menus',
  imports: [CommonModule, ModalComponent, AddModalComponent, RemoveModalComponent],
  templateUrl: './section-menus.component.html',
  styleUrl: './section-menus.component.scss'
})
export class SectionMenusComponent {
  @Input() menus: IMenu[] = [];
  @Input() isModalOpen = false;
  @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
  @Input() selectedMenu: IMenu | null = null;
  @Input() menuForm!: FormGroup;
  @Input() formData!: { labelName: string; valueLabel: string }[];

  @Output() addMenu = new EventEmitter<void>();
  @Output() editMenu = new EventEmitter<IMenu>();
  @Output() deleteMenu = new EventEmitter<IMenu>();
  @Output() saveMenu = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  readonly tableHeaders = [
    'ID Menu',
    'Name',
    'Description',
    'Dishes',
    'Actions',
  ];

  onOpenAddModal(): void {
    this.addMenu.emit();
  }

  onOpenEditModal(menu: IMenu): void {
    this.editMenu.emit(menu);
  }

  onOpenDeleteModal(menu: IMenu): void {
    this.deleteMenu.emit(menu);
  }

  onSave(): void {
    this.saveMenu.emit();
  }

  onDelete(): void {
    this.confirmDelete.emit();
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
