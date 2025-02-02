import { Component, inject, Input, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient } from '../../../../domain/model/client.model';
import { IControls } from 'shared';
import { InputComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { ModalUseCase } from '../../../../application/modal.usecase';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, InputComponent, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);
  private _useCaseModal = inject(ModalUseCase);
  public message = input<string>();
  public onSubmit = output<IClient>();


  @Input()
  set client(value: IClient | null) {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }

  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    
    id: [null]
  })

  public controls: IControls[] = [
    { text: 'Nombre', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Juan' },
    { text: 'Apellido', type: 'input', inputType: "text", controlName: 'lastName', placeholder: 'Perez' },
    { text: 'Correo', type: 'input', inputType: "email", controlName: 'email', placeholder: 'juan@perez.com' }
  ]

  submit() {
    if (!this.form.invalid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  ngOnInit(): void {
    this._useCaseModal.initSubscriptions();
    this._useCaseModal.openModal$().subscribe(result => {
      if (result) {
        this.form.reset();
      }
    })
  }

  ngOnDestroy(): void {
    this._useCaseModal.destroySubscriptions();
  }


}
