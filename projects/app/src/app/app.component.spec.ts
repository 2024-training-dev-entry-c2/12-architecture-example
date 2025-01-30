import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should be 5', () => {
    const num1 = 3;
    const num2 = 2;

    const result = num1 + num2;

    expect(result).toBe(5);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentRef.setInput('title', 'Angular');

    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(app.title()).toBe('Angular');
    expect(compiled.querySelector('p').textContent).toBe('Angular');
  })

  it('should be called onClick', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector('button');
    spyOn(app.onClick, 'emit');

    buttonElement.click();
    
    expect(app.onClick.emit).toHaveBeenCalled();
  });
});
