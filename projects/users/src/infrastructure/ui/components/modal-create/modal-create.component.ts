import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnDestroy, output, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertService, ButtonComponent, FormInputComponent } from 'shared';

@Component({
  selector: 'lib-modal-create',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FormInputComponent,ButtonComponent],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.scss',
})
export class ModalCreateComponent implements OnDestroy{
  private destroy$ = new Subject<void>();

  registerForm = input<FormGroup>();
  submit = output<FormGroup>();
  close = output<void>();

  constructor(private alertService: AlertService) {
  }
  onSubmit() {
    if (this.registerForm().valid) {
      this.submit.emit(this.registerForm());
      this.close.emit();
    } else {
      debugger;
      this.close.emit();
    }
  }

  onNoClick(): void {
    debugger;
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
