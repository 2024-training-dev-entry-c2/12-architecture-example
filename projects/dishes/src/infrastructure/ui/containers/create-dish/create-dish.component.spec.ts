import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishComponent } from './create-dish.component';

describe('CreateDishComponent', () => {
  let component: CreateDishComponent;
  let fixture: ComponentFixture<CreateDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
