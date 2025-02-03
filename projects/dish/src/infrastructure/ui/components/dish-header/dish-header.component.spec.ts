import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishHeaderComponent } from './dish-header.component';

describe('DishHeaderComponent', () => {
  let component: DishHeaderComponent;
  let fixture: ComponentFixture<DishHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
