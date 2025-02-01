import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('header')).toBeTruthy();
  });

  it('should render the logo', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('img')).toBeTruthy();
    expect(compiled.querySelector('img').getAttribute('src')).toBe('icon.png');
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')).toBeTruthy();
    expect(compiled.querySelector('h3').textContent).toBe('Sabores encantados');
  });
});
