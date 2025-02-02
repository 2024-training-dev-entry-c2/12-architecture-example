import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesSectionComponent } from './dishes-section.component';

describe('DishesSectionComponent', () => {
  let component: DishesSectionComponent;
  let fixture: ComponentFixture<DishesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
