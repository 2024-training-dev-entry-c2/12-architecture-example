import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderFormComponent } from './update-order-form.component';

describe('UpdateOrderFormComponent', () => {
  let component: UpdateOrderFormComponent;
  let fixture: ComponentFixture<UpdateOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
