import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitComponent } from './button-submit.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ButtonSubmitComponent', () => {
  let component: ButtonSubmitComponent;
  let fixture: ComponentFixture<ButtonSubmitComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSubmitComponent],
    })
      .overrideComponent(ButtonSubmitComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonSubmitComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button element', () => {
    expect(buttonElement).toBeTruthy();
  });

  it('should display the correct text from input', () => {
    fixture.componentRef.setInput('text', 'Submit Form');
    fixture.detectChanges();
    expect(buttonElement.textContent).toContain('Submit Form');

    fixture.componentRef.setInput('text', 'Guardar Cambios');
    fixture.detectChanges();
    expect(buttonElement.textContent).toContain('Guardar Cambios');
  });

  it('should have the correct css class', () => {
    expect(buttonElement.classList).toContain('button');
  });
});
