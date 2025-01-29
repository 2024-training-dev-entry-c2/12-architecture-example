import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMenusContentComponent } from './section-menus-content.component';

describe('SectionMenusContentComponent', () => {
  let component: SectionMenusContentComponent;
  let fixture: ComponentFixture<SectionMenusContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionMenusContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMenusContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
