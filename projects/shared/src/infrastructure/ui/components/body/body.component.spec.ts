import { TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';

describe('BodyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the body', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('body')).toBeTruthy();
  });

  it('should render the router-outlet', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
