import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerContainerComponent } from './view-customer-container.component';

describe('ViewCustomerContainerComponent', () => {
  let component: ViewCustomerContainerComponent;
  let fixture: ComponentFixture<ViewCustomerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
