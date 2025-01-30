import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClients } from '../../../../domain/model/clients.model';
import { FormGroup } from '@angular/forms';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { ModalComponent } from "shared";
import { RemoveModalComponent } from "../remove-modal/remove-modal.component";

@Component({
  selector: 'lib-section-clients',
  standalone: true,
  imports: [CommonModule, ModalComponent, AddModalComponent, RemoveModalComponent],
  templateUrl: './section-clients.component.html',
  styleUrl: './section-clients.component.scss'
})
export class SectionClientsComponent {
  @Input() clients: IClients[] = [];
  @Input() isModalOpen = false;
  @Input() modalType: 'add' | 'edit' | 'delete' = 'add';
  @Input() selectedClient: IClients | null = null;
  @Input() clientForm!: FormGroup;
  @Input() formData!: { labelName: string; valueLabel: string }[];

  @Output() addClient = new EventEmitter<void>();
  @Output() editClient = new EventEmitter<IClients>();
  @Output() deleteClient = new EventEmitter<IClients>();
  @Output() saveClient = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  readonly tableHeaders = [
    'ID',
    'Name',
    'Email',
    'Total Orders',
    'User Type',
    'Actions',
  ];

  onOpenAddModal(): void {
    this.addClient.emit();
  }

  onOpenEditModal(client: IClients): void {
    this.editClient.emit(client);
  }

  onOpenDeleteModal(client: IClients): void {
    this.deleteClient.emit(client);
  }

  onSave(): void {
    this.saveClient.emit();
  }

  onDelete(): void {
    this.confirmDelete.emit();
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}