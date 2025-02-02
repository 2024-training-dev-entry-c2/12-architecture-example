import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishComponent } from '../../forms/add-dish/add-dish.component';

describe('AddDishComponent', () => {
  let component: AddDishComponent;
  let fixture: ComponentFixture<AddDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
