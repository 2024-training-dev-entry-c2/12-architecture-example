import { CommonModule } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  private _fb = inject(FormBuilder);
  public onSubmit = output<IClient>();

  @Input()
  set client(value: IClient | null) {
    if (value) {
      this.clientForm.patchValue(value);
    } else {
      this.clientForm.reset();
    }
  }

  public clientForm = this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      id: [null],
  });

  submit() {
    if(!this.clientForm.valid) return;
    this.onSubmit.emit(this.clientForm.getRawValue());
  }
}
