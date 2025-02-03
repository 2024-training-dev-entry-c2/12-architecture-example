import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from 'shared';
import { ThemeButtonComponent } from 'shared';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-client-form',
  imports: [ReactiveFormsModule, FormFieldComponent, ThemeButtonComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  private formBuilder = inject(FormBuilder);
  public onSubmit = output<IClient>();
  public action = input<string>();
  public theme  = input<'success' | 'warning'>('success');


  @Input()
  set client(value: IClient){
    this.form.patchValue(value);
  }

  public form = this.formBuilder.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    email : ['', [Validators.required, Validators.email]],
    // -------------------
    id : [null],
    frequent: [null]
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

