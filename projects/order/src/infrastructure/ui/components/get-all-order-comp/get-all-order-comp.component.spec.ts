import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllOrderCompComponent } from './get-all-order-comp.component';

describe('GetAllOrderCompComponent', () => {
  let component: GetAllOrderCompComponent;
  let fixture: ComponentFixture<GetAllOrderCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllOrderCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllOrderCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
