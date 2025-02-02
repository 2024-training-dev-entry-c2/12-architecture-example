import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDishesComponent } from './get-dishes.component';

describe('GetDishesComponent', () => {
  let component: GetDishesComponent;
  let fixture: ComponentFixture<GetDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
