import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-add-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent {
  @Input() clientForm!: FormGroup; // Recibe el FormGroup del componente padre
  @Input() formData: { labelName: string; valueLabel: string }[] = [];
  @Output() save = new EventEmitter<void>(); // Emite evento al guardar
}
