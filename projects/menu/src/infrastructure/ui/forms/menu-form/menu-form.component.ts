import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IControls, InputComponent, TextareaComponent } from 'shared';
import { IMenu } from '../../../../domain/model/menu.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-menu-form',
  imports: [ReactiveFormsModule, CommonModule, TextareaComponent, InputComponent],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit{
  private _fb = inject(FormBuilder);
  public message = input<string>();
  public onSubmit = output<IMenu>();
  public _isOpen = input<Observable<boolean>>();


  @Input()
  set menu(value: IMenu | null) {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }

  public form: FormGroup = this._fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    
    id: [null]
  })

  public controls: IControls[] = [
    { text: 'Nombre', type: 'input', inputType: "text", controlName: 'name', placeholder: 'Pizzas' },
    { text: 'Descripcion', type: 'textarea', inputType: "text", controlName: 'description', placeholder: 'Pizzas de diferentes sabores' },
  ]

  submit() {
    if (this.form.invalid) return;
    this.onSubmit.emit(this.form.getRawValue());
  }

  ngOnInit(): void {
    this._isOpen().subscribe(result => {
      if (!result) {
        this.form.reset();
      }
    })
  }

}
