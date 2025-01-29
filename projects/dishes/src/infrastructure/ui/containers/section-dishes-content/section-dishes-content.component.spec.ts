import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDishesContentComponent } from './section-dishes-content.component';

describe('SectionDishesContentComponent', () => {
  let component: SectionDishesContentComponent;
  let fixture: ComponentFixture<SectionDishesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDishesContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDishesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
