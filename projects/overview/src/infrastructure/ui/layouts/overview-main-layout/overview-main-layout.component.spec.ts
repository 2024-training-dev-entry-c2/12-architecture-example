import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewMainLayoutComponent } from './overview-main-layout.component';

describe('OverviewMainLayoutComponent', () => {
  let component: OverviewMainLayoutComponent;
  let fixture: ComponentFixture<OverviewMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
