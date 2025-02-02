import { NgClass } from "@angular/common";
import { Component, input } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { IDish } from "dishes";

@Component({
  selector: "lib-form-dish-selector",
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: "./form-dish-selector.component.html",
  styleUrl: "./form-dish-selector.component.scss",
})
export class FormDishSelectorComponent {
  public form = input.required<FormGroup>();
  public formArray = input.required<FormArray>();
  public dishes = input.required<IDish[]>();
  public index = input.required<number>();

  get control(): FormControl {
    const formArray = this.formArray();
    if (!formArray || formArray.length === 0) {
      return null as any; 
    }
    return formArray.at(this.index())?.get('dishId') as FormControl;
  }

  get isInvalid(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.errors["required"]) {
      return "Este campo es obligatorio.";
    }
    return "Selección inválida.";
  }
}
