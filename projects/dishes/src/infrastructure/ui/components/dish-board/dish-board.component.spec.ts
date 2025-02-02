import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishBoardComponent } from './dish-board.component';

describe('DishBoardComponent', () => {
  let component: DishBoardComponent;
  let fixture: ComponentFixture<DishBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
