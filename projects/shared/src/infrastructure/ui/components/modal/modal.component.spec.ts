import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let componentRef;
  let component: ModalComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    componentRef = fixture.componentRef;
    
    componentRef.setInput('idModal', '1');
    componentRef.setInput('title', 'Titulo del form');
    componentRef.setInput('action', 'Accion del form');
    componentRef.setInput('themeButton', 'success');
    componentRef.setInput('form', null);

    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visibility when toggle() is called', () => {
    component.visible = false;
    component.toggle();
    expect(component.visible).toBe(true);
  
    component.toggle();
    expect(component.visible).toBe(false);
  });

  it('should emit onOpen when modal is opened', () => {
    spyOn(component.onOpen, 'emit');
    component.toggle();
    expect(component.onOpen.emit).toHaveBeenCalled();
  });
  
  it('should emit onClose when modal is closed', () => {
    component.visible = true;
    spyOn(component.onClose, 'emit');
    component.toggle();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should call toggle() when the close button is clicked', () => {
    spyOn(component, 'toggle');
    const closeButton = compiled.querySelector('.modal__button-close') as HTMLButtonElement;
    closeButton.click();
    expect(component.toggle).toHaveBeenCalled();
  });

  it('should emit onOpenByBtn when the action button is clicked', () => {
    spyOn(component.onOpenByBtn, 'emit');
    component.openWithBtn();
    expect(component.onOpenByBtn.emit).toHaveBeenCalled();
  });

  it('should display the correct title and action button text', () => {    
    const title = compiled.querySelector('.modal__title').textContent;
    const buttonText = compiled.querySelector('lib-theme-button').textContent;
  
    expect(title).toBe('Titulo del form');
    expect(buttonText).toBe('Accion del form');
  });
});
