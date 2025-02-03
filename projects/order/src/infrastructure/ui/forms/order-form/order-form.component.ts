import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IClient, IDish, IOrder } from '../../../../domain/model/order.model';
import { DynamicInputComponent } from 'shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-order-form',
  imports: [DynamicInputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnChanges {
    private _fb = inject(FormBuilder);
    public onSubmit = output<IOrder>();
    public clients = input<IClient[]>();
    public dishes = input<IDish[]>();

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['clients'] && this.clients()) {    
        this.clientConfig.options = this.clients().map(client => ({
          label: client.name,
          value: client.id   
        }));
      }
      if (changes['dishes'] && this.dishes()) {
        this.dishConfig.options = this.dishes().map(dish => ({
          label: dish.name,
          value: dish.id  
        }));
      }
    }
  
  
    @Input()
    set order(value: IOrder | null) {
      if (value) {
        this.orderForm.patchValue({
          ...value,
          clientId: value.clientId || '',
        });
      } else {
        this.orderForm.reset();
      }
    }
  
    public orderForm = this._fb.group({
      clientId: ['', Validators.required],
      dishIds: [[], Validators.required],
      id: [null],
    });

    clientConfig = {
      name: 'clientId',
      label: 'Cliente',
      type: 'select',
      options: [] as { label: string; value: any }[],
      placeholder: 'Seleccione un cliente',
      errorMessage: 'Debe seleccionar un cliente.'
    };

    dishConfig = {
      name: 'dishIds',
      label: 'Platos',
      type: 'selectM',
      options: [] as { label: string; value: any }[],
      placeholder: 'Seleccione platos',
      errorMessage: 'Debe seleccionar al menos un plato.'
      
    };
  
    submit() {
      if(!this.orderForm.valid) return;
      this.onSubmit.emit(this.orderForm.getRawValue());
    }
}
