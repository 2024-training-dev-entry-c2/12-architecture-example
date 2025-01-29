import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMenusComponent } from './section-menus.component';

describe('SectionMenusComponent', () => {
  let component: SectionMenusComponent;
  let fixture: ComponentFixture<SectionMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
