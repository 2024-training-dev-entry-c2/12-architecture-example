import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signal } from '@angular/core';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    TestBed.runInInjectionContext(() => {
      (component.action as any) = signal('Test Action');
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with modal hidden', () => {
    const dialog = fixture.nativeElement.querySelector('.modal');
    expect(dialog.classList.contains('modal--visible')).toBeFalsy();
    expect(component.visible).toBeFalsy();
  });

  it('should toggle visibility when toggle() is called', () => {
    component.toggle();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.modal');
    expect(dialog.classList.contains('modal--visible')).toBeTruthy();
    expect(component.visible).toBeTruthy();

    component.toggle();
    fixture.detectChanges();

    expect(dialog.classList.contains('modal--visible')).toBeFalsy();
    expect(component.visible).toBeFalsy();
  });

  it('should display action text in button', () => {
    const button = fixture.nativeElement.querySelector('lib-button');
    expect(button.getAttribute('ng-reflect-text')).toBe('Test Action');
  });

  it('should toggle modal when button is clicked', () => {
    // const button = fixture.nativeElement.querySelector('lib-button'); //! no funciono de esta manera pero vale la pena investigar
    // button.click();
    const buttonElement = fixture.nativeElement.querySelector('lib-button');
    buttonElement.dispatchEvent(new Event('onClick'));

    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.modal');
    expect(dialog.classList.contains('modal--visible')).toBeTruthy();
    expect(component.visible).toBeTruthy();
  });

  it('should close modal when close icon is clicked', () => {
    component.toggle();
    fixture.detectChanges();

    const closeIcon = fixture.nativeElement.querySelector('.modal__close');
    closeIcon.click();
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.modal');
    expect(dialog.classList.contains('modal--visible')).toBeFalsy();
    expect(component.visible).toBeFalsy();
  });
});
