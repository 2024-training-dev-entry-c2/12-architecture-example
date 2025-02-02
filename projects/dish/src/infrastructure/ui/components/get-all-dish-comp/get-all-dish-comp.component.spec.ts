import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllDishCompComponent } from './get-all-dish-comp.component';

describe('GetAllDishCompComponent', () => {
  let component: GetAllDishCompComponent;
  let fixture: ComponentFixture<GetAllDishCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllDishCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllDishCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
