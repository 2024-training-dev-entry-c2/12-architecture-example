import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-update-menu-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-menu-form.component.html',
  styleUrl: './update-menu-form.component.css'
})
export class UpdateMenuFormComponent {
  @Input() currentMenuName: string = '';
  @Output() submitEvent = new EventEmitter<string>();

  public menuEditForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.menuEditForm = this.fb.group({
      menuName: [this.currentMenuName, Validators.required]
    });
  }

  emitMenuName(): void {
    if (this.menuEditForm.valid) {
      this.submitEvent.emit(this.menuEditForm.value.menuName);
    } else {
      console.log('Formulario no válido');
    }
  }
}
