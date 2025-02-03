import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHeaderComponent } from './order-header.component';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { IOrder } from '../../../../domain/model/orders.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('OrderHeaderComponent', () => {
  let component: OrderHeaderComponent;
  let fixture: ComponentFixture<OrderHeaderComponent>;
  let orderFormComponent: OrderFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderHeaderComponent, OrderFormComponent],
      imports: [ReactiveFormsModule] // Necesario para formularios reactivos
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHeaderComponent);
    component = fixture.componentInstance;
    orderFormComponent = fixture.debugElement.query(
      (de) => de.componentInstance instanceof OrderFormComponent
    ).componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit order when submitOrder is called with valid form data', () => {
    const orderData: IOrder = { idOrder: 1, orderItems: [], clientName: 'Test Client', totalAmount: 100 };
    spyOn(orderFormComponent, 'getFormData').and.returnValue(orderData);
    spyOn(component.onSubmitOrder, 'emit');

    orderFormComponent.form.setValue({ items: [],  total: 100 });  
    orderFormComponent.form.markAsDirty();
    orderFormComponent.form.markAsTouched();
    orderFormComponent.form.updateValueAndValidity(); 

    component.submitOrder();

    expect(orderFormComponent.getFormData).toHaveBeenCalled();
    expect(component.onSubmitOrder.emit).toHaveBeenCalledWith(orderData);
  });

  it('should reset the form after submitting', () => {
    spyOn(orderFormComponent, 'resetForm');

    orderFormComponent.form.setValue({ items: [], total: 100 });
    orderFormComponent.form.markAsDirty();
    orderFormComponent.form.markAsTouched();
    orderFormComponent.form.updateValueAndValidity(); 

    component.submitOrder();

    expect(orderFormComponent.resetForm).toHaveBeenCalled();
  });

  it('should not emit order if form is invalid', () => {
    spyOn(orderFormComponent, 'getFormData').and.returnValue(null);
    spyOn(component.onSubmitOrder, 'emit');

    orderFormComponent.form.setValue({ items: [], total: 100 });
    orderFormComponent.form.markAsTouched();
    orderFormComponent.form.updateValueAndValidity();

    component.submitOrder();

    expect(orderFormComponent.getFormData).not.toHaveBeenCalled();
    expect(component.onSubmitOrder.emit).not.toHaveBeenCalled();
  });
});
