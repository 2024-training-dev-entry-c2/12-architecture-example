import { Component, inject, Input, OnInit, output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-form-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.scss'
})
export class FormClientComponent {

  private formBuilder = inject(FormBuilder);
  @Input() title: String = '';
  @Input() action: String = '';
  @Input() client: IClient | null = null;
  private cdr = inject(ChangeDetectorRef);
  // public idCliente?: number;

  public onSubmit = output<IClient>();

  public form = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    cedula: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']?.currentValue) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.client) {
      this.form.patchValue(this.client);
      this.cdr.detectChanges(); 
    }
  }

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }


}
