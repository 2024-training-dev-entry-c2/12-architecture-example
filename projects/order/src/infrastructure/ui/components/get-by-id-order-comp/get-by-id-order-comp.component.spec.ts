import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdOrderCompComponent } from './get-by-id-order-comp.component';

describe('GetByIdOrderCompComponent', () => {
  let component: GetByIdOrderCompComponent;
  let fixture: ComponentFixture<GetByIdOrderCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdOrderCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdOrderCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
