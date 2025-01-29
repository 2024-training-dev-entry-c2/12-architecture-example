import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDishesComponent } from './section-dishes.component';

describe('SectionDishesComponent', () => {
  let component: SectionDishesComponent;
  let fixture: ComponentFixture<SectionDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
