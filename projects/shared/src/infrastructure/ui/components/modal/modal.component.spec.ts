import { TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('input', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.componentRef.setInput('action', '');
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.action).not.toContain('Aceptar');
  });

  it('Debe iniciar en false', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const app = fixture.componentInstance;
    expect(app.visible).toBeFalse();
  });

  it('toggle()', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const app = fixture.componentInstance;

    app.toggle();
    expect(app.visible).toBeTrue();

    app.toggle();
    expect(app.visible).toBeFalse();
  });
});
