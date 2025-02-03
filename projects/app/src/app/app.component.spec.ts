import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'es' } 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the locale set to "es"', () => {
    const locale = TestBed.inject(LOCALE_ID);
    expect(locale).toEqual('es');
  });

  it('should render the router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();
  });
});
