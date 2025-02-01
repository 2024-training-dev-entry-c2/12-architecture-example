import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/clients.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
private readonly fb = inject(FormBuilder);

  @Input() isEditForm: boolean = false;
  @Input() currentClientName: string = '';
  @Input() currentEmail: string = '';
  @Input() currentPhoneNumber: string = '';
  @Input() currentAddress: string = '';
  @Input() currentRegistrationDate: Date = new Date();
  @Input() currentFrequentUser: boolean = false;
  @Input() currentVip: boolean = false;

  public form: FormGroup = this.fb.group({
    clientName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    registrationDate: ['', Validators.required],
    frequentUser: [false],
    vip: [false]
  });

  ngOnChanges(): void {
    if (this.isEditForm && this.currentClientName ) {
      this.form.patchValue(
        { clientName: this.currentClientName,
          email: this.currentEmail,
          phoneNumber: this.currentPhoneNumber,
          address: this.currentAddress,
          registrationDate: this.currentRegistrationDate,
          frequentUser: this.currentFrequentUser,
          vip: this.currentVip
        });
    }
  }

  getFormData(): IClient | null {
    if (!this.form.valid) {
      return null;
    }
    const formData = this.form.getRawValue();
    return formData;
  }
  
  resetForm(): void {
    this.form.reset();
  }
}
