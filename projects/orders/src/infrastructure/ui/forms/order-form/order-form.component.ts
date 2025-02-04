import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IOrder } from '../../../../domain/model/order.model';
import { IDish } from '../../../../domain/model/dish.model';
import { IClient } from '../../../../domain/model/client.model';
import { IControls, IOptions, SelectComponent } from 'shared';
import { CommonModule } from '@angular/common';
import { TagsContainerComponent } from '../../components/tags-container/tags-container.component';

@Component({
  selector: 'lib-order-form',
  imports: [ReactiveFormsModule, CommonModule, SelectComponent, TagsContainerComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  private _fb = inject(FormBuilder);
  public message = input<string>();
  public isOpen$ = input<Observable<boolean>>();
  public dishes$ = input<Observable<IDish[]>>();
  public clients$ = input<Observable<IClient[]>>();
  public onSubmit = output<IOrder>();

  public dishesOptions: IOptions[] = [];
  public clientOptions: IOptions[] = [];
  public selectedTags: { value: any; label: string; quantity: number }[] = [];
  public totalPrice: number = 0;

  @Input()
  set order(value: IOrder | null) {
    if (value) {
      this.form.patchValue({
        id: value.id ?? null,
        clientId: value.clientId ?? null,
        dishIds: value.dishes ? value.dishes.map(dish => dish.id) : []
      }, { emitEvent: false });

      this.selectedTags = [];
      value.dishes?.forEach(dish => {
        const existingTag = this.selectedTags.find(tag => tag.value === dish.id);
        if (existingTag) {
          existingTag.quantity += 1;
        } else {
          this.selectedTags.push({ value: dish.id, label: dish.name, quantity: 1 });
        }
      });

      this.updateFormValue();
    } else {
      this.form.reset({}, { emitEvent: false });
      this.selectedTags = [];
      this.totalPrice = 0;
    }
  }


  public form: FormGroup = this._fb.group({
    id: [null],
    clientId: [null, [Validators.required]],
    dishIds: [[], [Validators.required]],
  });

  public controls: IControls[] = [
    { text: 'Cliente', type: 'select', controlName: 'clientId', placeholder: 'Seleccionar Cliente', options: [] },
    { text: 'Platos', type: 'select', controlName: 'dishIds', placeholder: 'Seleccionar Platos', options: [] },
  ];

  public ngOnInit(): void {
    this.clients$().subscribe(clients => {
      this.clientOptions = (clients ?? []).map(client => ({
        name: `${client.name} ${client.lastName}`,
        value: client.id,
      }));
      this.updateClientOptions();
    });

    this.dishes$().subscribe(dishes => {
      this.dishesOptions = (dishes ?? []).map(dish => ({
        value: dish.id,
        name: `${dish.name} - $${dish.price}`,
      }));
      this.updateDishesOptions();
    });

    this.isOpen$().subscribe(result => {
      if (!result) {
        this.form.reset();
        this.selectedTags = [];
        this.totalPrice = 0;
      }
    });

    this.form.get('dishIds')?.valueChanges.subscribe(dishes => {
      if (dishes && Array.isArray(dishes)) {
        this.initializeTags(dishes);
      }
    });

  }

  public handleSelectChange(event: Event): string {
    const select = event.target as HTMLSelectElement;
    return select?.value?.trim() || '';
  }


  public addTag(value: string): void {
    if (!value) return;

    const existingTag = this.selectedTags.find(tag => tag.value === value);
    if (existingTag) {
      existingTag.quantity += 1;
    } else {
      const option = this.dishesOptions.find(opt => opt.value === Number(value));
      if (option) {
        this.selectedTags.push({ value: option.value, label: option.name, quantity: 1 });
      }
    }

    this.updateFormValue();
  }

  public removeTag(value: any): void {
    const tagIndex = this.selectedTags.findIndex(tag => tag.value === value);

    if (tagIndex > -1) {
      if (this.selectedTags[tagIndex].quantity > 1) {
        this.selectedTags[tagIndex].quantity -= 1;
      } else {
        this.selectedTags.splice(tagIndex, 1);
      }
    }

    this.updateFormValue();
  }

  private updateFormValue(): void {
    const values = this.selectedTags.flatMap(tag => Array(tag.quantity).fill(Number(tag.value)));
    this.form.get('dishIds')?.setValue(values, { emitEvent: false });

    this.totalPrice = this.selectedTags.reduce((total, tag) => {
      const dish = this.dishesOptions.find(d => d.value === tag.value);
      return total + (dish ? parseFloat(dish.name.split('$')[1]) * tag.quantity : 0);
    }, 0);
  }


  private updateClientOptions(): void {
    const clientControl = this.controls.find(control => control.controlName === 'clientId');
    if (clientControl) {
      clientControl.options = this.clientOptions;
    }
  }

  private updateDishesOptions(): void {
    const dishControl = this.controls.find(control => control.controlName === 'dishIds');
    if (dishControl) {
      dishControl.options = this.dishesOptions;
    }
  }

  private initializeTags(dishes: any): void {
    if (!Array.isArray(dishes)) {
      dishes = [];
    }

    this.selectedTags = dishes
      .map(dishId => {
        const dish = this.dishesOptions.find(d => d.value === dishId);
        return dish ? { value: dish.value, label: dish.name, quantity: 1 } : null;
      })
      .filter(dish => dish !== null);

    this.updateFormValue();
  }


  public submit(): void {
    if (this.form.invalid) return;

    const requestBody = this.form.getRawValue();

    delete requestBody.id;

    requestBody.clientId = Number(requestBody.clientId);

    requestBody.dishIds = (requestBody.dishIds || []).map(Number);

    console.log("📌 JSON enviado al backend:", JSON.stringify(requestBody, null, 2));
    this.onSubmit.emit(requestBody);
  }



}


