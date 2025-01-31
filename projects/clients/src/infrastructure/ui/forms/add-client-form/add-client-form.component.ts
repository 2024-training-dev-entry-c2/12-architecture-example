import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-add-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-client-form.component.html',
  styleUrl: './add-client-form.component.scss'
})
export class AddClientFormComponent {
 private formBuilder = inject(FormBuilder);
  @Input() isEditMode: boolean = false;
  @Input() clientData: IClient | null = null;
  @Output() clientSubmitted = new EventEmitter<IClient>();

  public clientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    numberPhone: ['', [Validators.required]],
  });

  ngOnChanges(): void {
    if (this.clientData) {
      this.clientForm.patchValue(this.clientData);
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientSubmitted.emit(this.clientForm.getRawValue());
      this.clientForm.reset();
    }
  }
}
