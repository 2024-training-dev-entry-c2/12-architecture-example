import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IControls, InputComponent } from 'shared';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  public message = input<string>();
  public open$ = input<Observable<boolean>>();
  public onSubmit = output<IClient>();

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  public controls: IControls[] = [
    { type: 'input', text: 'Nombre', inputType: 'text', controlName: 'name' },
    { type: 'input', text: 'Apellido', inputType: 'text', controlName: 'lastName' },
    { type: 'input', text: 'Correo', inputType: 'email', controlName: 'email' }
  ];

  @Input()
  set client(value: IClient) {
    this.form.patchValue(value);
  }

  ngOnInit() {
    this.open$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  public submit(): void {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}
