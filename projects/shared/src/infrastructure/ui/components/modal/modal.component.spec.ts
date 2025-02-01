import { TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the dialog', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('dialog')).toBeTruthy();
  });

  it('should render the closa modal', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.modal__close')).toBeTruthy();
  });

  it('should render the content', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.modal__content')).toBeTruthy();
  });

  it('should render the modal open', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.componentRef.setInput('open', true);

    fixture.detectChanges();
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.open()).toBeTruthy();
  });

  it('should render the modal close', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const closeModal = compiled.querySelector('.modal__close') as HTMLElement;
    fixture.componentRef.setInput('open', false);

    spyOn(component.clickClose, 'emit');
    closeModal.click();
    expect(component.clickClose.emit).toHaveBeenCalled();
  });

});
