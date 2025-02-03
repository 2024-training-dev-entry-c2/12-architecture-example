import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMainComponent } from './dish-main.component';

describe('DishMainComponent', () => {
  let component: DishMainComponent;
  let fixture: ComponentFixture<DishMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
