import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-by-id-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-by-id-client.component.html',
  styleUrls: ['./form-by-id-client.component.scss']
})
export class FormByIdClientComponent {
  private formBuilder = inject(FormBuilder);

  // Renombramos el output a clientSubmit para evitar conflicto con el evento nativo
  @Output() public clientSubmit = new EventEmitter<number>();

  public form = this.formBuilder.group({
    id: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  Submit(event: Event) {
    event.preventDefault(); // Prevenir el evento nativo
    if (!this.form.valid) return;
    const idValue = this.form.get('id')?.value;
    this.clientSubmit.emit(idValue);
  }
}

