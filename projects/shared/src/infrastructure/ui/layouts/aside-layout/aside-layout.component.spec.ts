import { TestBed } from '@angular/core/testing';

import { AsideLayoutComponent } from './aside-layout.component';

describe('AsideLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideLayoutComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AsideLayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
