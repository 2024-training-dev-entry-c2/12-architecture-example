import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutSharedComponent } from './main-layout-shared.component';

describe('MainLayoutSharedComponent', () => {
  let component: MainLayoutSharedComponent;
  let fixture: ComponentFixture<MainLayoutSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
