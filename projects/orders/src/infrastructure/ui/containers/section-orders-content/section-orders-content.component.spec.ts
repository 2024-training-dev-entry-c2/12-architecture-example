import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOrdersContentComponent } from './section-orders-content.component';

describe('SectionOrdersContentComponent', () => {
  let component: SectionOrdersContentComponent;
  let fixture: ComponentFixture<SectionOrdersContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionOrdersContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionOrdersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
