import { Component, inject, input, Input, output } from '@angular/core';
import { IMenu } from '../../../../domain/model/menu.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent, ThemeButtonComponent } from 'shared';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ThemeButtonComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IMenu>();
  public action = input<string>();
  public theme  = input<'success' | 'warning'>('success');


  @Input()
  set menu(value: IMenu){
    this.form.patchValue(value);
  }

  public form = this.formBuilder.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    // -------------------
    id : [null],
    dishes: [null]
  });

  submit(){
    if(!this.form.valid)return;
    this.onSubmit.emit(this.form.getRawValue());
    this.resetForm();
  }

  public resetForm(){
    this.form.reset();    
  }
}
