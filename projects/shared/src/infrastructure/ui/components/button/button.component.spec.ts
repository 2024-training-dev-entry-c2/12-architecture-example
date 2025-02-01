import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the button', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('a')).toBeTruthy();
  });

  it('should render the svg', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('svg')).toBeTruthy();
  });

  it('should render the span', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('span')).toBeTruthy();
  });

  it('should render the svg', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('svg', 'edit');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.svg()).toBe('edit');
    expect(compiled.querySelector('use').getAttribute('href')).toBe('icons.svg#edit');
  })

  it('should render the text aria-label', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('text', 'Button for delete register');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.text()).toBe('Button for delete register');
    expect(compiled.querySelector('a').getAttribute('aria-label')).toBe('Button for delete register');
  });

  it('should render the class', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('class', 'data__table-action data__table-action--edit');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.class()).toBe('data__table-action data__table-action--edit');
    expect(compiled.querySelector('a').getAttribute('class')).toBe('data__table-action data__table-action--edit');
  });

  it('should render the span', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('span', 'Agregar');

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.span()).toBe('Agregar');
    expect(compiled.querySelector('span').textContent).toBe('Agregar');
  });
});
