import { TestBed } from '@angular/core/testing';

import { ConfirmActionComponent } from './confirm-action.component';

describe('ConfirmActionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmActionComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('span')).toBeTruthy();
    expect(compiled.querySelector('span').textContent).toBe('¿Estás seguro de que quieres eliminar este registro?');
  });

  it('should render the button confirm', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.confirm__button--confirm')).toBeTruthy();
    expect(compiled.querySelector('.confirm__button--confirm').textContent).toBe('Sí, eliminar');
  });

  it('should render the button cancel', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.confirm__button--cancel')).toBeTruthy();
    expect(compiled.querySelector('.confirm__button--cancel').textContent).toBe('No, cancelar');
  });

  it('should emit the clickConfirm', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const confirmButton = compiled.querySelector('.confirm__button--confirm') as HTMLElement;
    spyOn(component.clickConfirm, 'emit');

    confirmButton.click();
    expect(component.clickConfirm.emit).toHaveBeenCalled();
  });

  it('should emit the clickCancel', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const cancelButton = compiled.querySelector('.confirm__button--cancel') as HTMLElement;

    spyOn(component.clickCancel, 'emit');

    cancelButton.click();

    expect(component.clickCancel.emit).toHaveBeenCalled();
  });
});
