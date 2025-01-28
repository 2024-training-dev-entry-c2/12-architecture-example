import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideLayoutComponent } from './aside-layout.component';

describe('AsideLayoutComponent', () => {
  let component: AsideLayoutComponent;
  let fixture: ComponentFixture<AsideLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
