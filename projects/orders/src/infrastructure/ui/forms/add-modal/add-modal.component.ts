import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IDishes } from 'dishes';

@Component({
  selector: 'lib-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent {
  @Input() editData: any = null;
  @Input() availableDishes: IDishes[] = [];
  @Output() save = new EventEmitter<any>();

  orderForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData && this.orderForm) {
      this.updateFormWithEditData();
    }else{
      this.resetForm();
    }
  }

  private initializeForm(): void {
    this.orderForm = this._formBuilder.group({
      clientName: ['', [Validators.required, Validators.minLength(3)]],
      clientEmail: ['', [Validators.required, Validators.email]],
      dishes: this._formBuilder.array([]),
    });

    if (this.editData) {
      this.updateFormWithEditData();
    }
  }

  private updateFormWithEditData(): void {
    this.orderForm.patchValue({
      clientName: this.editData.clientName,
      clientEmail: this.editData.clientEmail,
    });

    this.dishes.clear();
    this.editData.dishes.forEach((dish: IDishes) => {
      this.dishes.push(new FormControl(dish));
    });
  }

  get dishes(): FormArray {
    return this.orderForm.get('dishes') as FormArray;
  }

  toggleDishSelection(event: Event, dish: IDishes): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.dishes.push(new FormControl(dish));
    } else {
      const index = this.dishes.value.findIndex((d: IDishes) => d.id === dish.id);
      if (index !== -1) {
        this.removeDish(index);
      }
    }
  }

  isDishSelected(dishId: number): boolean {
    return this.dishes.value.some((dish: IDishes) => dish.id === dishId);
  }

  removeDish(index: number): void {
    this.dishes.removeAt(index);
  }

  onSave(): void {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        dishes: this.dishes.value.map((dish: IDishes) => ({ id: dish.id, name: dish.name, price: dish.price }))
      };
      this.save.emit(orderData);
    }
  }

  resetForm(): void {
    this.orderForm.reset();
  }
}