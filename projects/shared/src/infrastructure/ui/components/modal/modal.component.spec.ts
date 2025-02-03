import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../button/button.component';
import { NgClass } from '@angular/common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgClass, ButtonComponent, ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.action = 'Abrir modal';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the visible property', () => {
    expect(component.visible).toBeFalse();
    component.toggle();
    expect(component.visible).toBeTrue();
    component.toggle();
    expect(component.visible).toBeFalse();
  });

  it('should render the modal when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();

    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement.classList.contains('modal--visible')).toBeTrue();

    const modalContent = fixture.nativeElement.querySelector('.modal__content');
    expect(modalContent.hidden).toBeFalse();
  });

  it('should hide the modal when visible is false', () => {
    component.visible = false;
    fixture.detectChanges();

    const modalElement = fixture.nativeElement.querySelector('.modal');
    expect(modalElement.classList.contains('modal--visible')).toBeFalse();

    const modalContent = fixture.nativeElement.querySelector('.modal__content');
    expect(modalContent.hidden).toBeTrue();
  });

  it('should call toggle() when the close icon is clicked', () => {
    spyOn(component, 'toggle');
    component.visible = true;
    fixture.detectChanges();

    const closeIcon = fixture.nativeElement.querySelector('.modal__close');
    closeIcon.click();
    expect(component.toggle).toHaveBeenCalled();
  });


  it('should render the action text in the button', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('lib-button');
    expect(button.textContent).toContain('Abrir modal');
  });
});
