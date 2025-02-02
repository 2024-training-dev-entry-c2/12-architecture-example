import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-by-id-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './form-by-id-menu.component.html',
  styleUrl: './form-by-id-menu.component.scss'
})
export class FormByIdMenuComponent {
  private formBuilder = inject(FormBuilder);

  @Output() public menuSubmit = new EventEmitter<number>();

  public form = this.formBuilder.group({
    id: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  Submit(event: Event) {
    event.preventDefault(); // Prevenir el evento nativo
    if (!this.form.valid) return;
    const idValue = this.form.get('id')?.value;
    this.menuSubmit.emit(idValue);
  }
}
