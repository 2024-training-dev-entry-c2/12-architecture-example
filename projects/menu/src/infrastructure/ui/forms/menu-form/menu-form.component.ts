import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IControls, InputComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menu.model';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  public message = input<string>();
  public open$ = input<Observable<boolean>>();
  public onSubmit = output<IMenu>();

  @Input()
  set menu(value: IMenu) {
    this.form.patchValue(value);
  }

  public form: FormGroup = this.formBuilder.group({
    id: [null],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  public controls: IControls[] = [
    { type: 'input', text: 'Nombre', inputType: 'text', controlName: 'name' },
    { type: 'input', text: 'Descripcion', inputType: 'text', controlName: 'description' }
  ];

  ngOnInit(): void {
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