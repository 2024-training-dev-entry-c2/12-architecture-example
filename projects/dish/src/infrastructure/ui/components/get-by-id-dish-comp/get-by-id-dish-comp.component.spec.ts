import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByIdDishCompComponent } from './get-by-id-dish-comp.component';

describe('GetByIdDishCompComponent', () => {
  let component: GetByIdDishCompComponent;
  let fixture: ComponentFixture<GetByIdDishCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetByIdDishCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByIdDishCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
