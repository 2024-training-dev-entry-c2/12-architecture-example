import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMenu } from 'menus';
import { FormFieldComponent, ThemeButtonComponent } from 'shared';
import { FormSelectorComponent } from "../form-selector/form-selector.component";
import { IDish } from '../../../../domain/model/dish.model';

@Component({
  selector: 'lib-dish-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ThemeButtonComponent, FormSelectorComponent],
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.scss'
})
export class DishFormComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IDish>();
  public action = input<string>();
  public menus = input<IMenu[]>();
  public theme  = input<'success' | 'warning'>('success');


  @Input()
  set dish(value: IDish){
    this.form.patchValue(value);
  }

  public form = this.formBuilder.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    description : ['', [Validators.required, Validators.minLength(5)]],
    price : [0, [Validators.required]],
    menuId : [0, [Validators.required]],
    // -------------------
    id : [null],
    state : [null]
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
