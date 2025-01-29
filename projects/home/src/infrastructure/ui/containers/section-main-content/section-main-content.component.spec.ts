import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMainContentComponent } from './section-main-content.component';

describe('SectionMainContentComponent', () => {
  let component: SectionMainContentComponent;
  let fixture: ComponentFixture<SectionMainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionMainContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
