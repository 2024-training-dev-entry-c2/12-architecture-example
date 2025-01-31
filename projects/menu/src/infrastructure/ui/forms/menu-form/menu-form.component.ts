import { Component, inject, input, Input, OnDestroy, OnInit, output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IControls, InputComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { ModalUsecase } from '../../../../application/modal.usecase';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit, OnDestroy {
  private readonly _useCaseModal = inject(ModalUsecase);
  private formBuilder = inject(FormBuilder);
  public message = input<string>();
  public onSubmit = output<IMenu>();

  @Input()
  set menu(value: IMenu) {
    this.form.patchValue(value);
  }

  ngOnInit() {
    this._useCaseModal.initSubscriptions();
    this._useCaseModal.open$().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    });
  }

  ngOnDestroy() {
    this._useCaseModal.destroySubscriptions();
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  public controls: IControls[] = [
    {type: 'input', text: 'Nombre', inputType: 'text', controlName: 'name'},
    {type: 'input', text: 'Descripcion', inputType: 'text', controlName: 'description'}
  ];

  submit() {
    if (!this.form.valid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }
}