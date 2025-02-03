import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('Crea el componente', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('input', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('text', '');
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.text).not.toContain('dsfsdfsdaf');
  });

  it('onClick al llamar handleClick', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const app = fixture.componentInstance;
    spyOn(app.onClick, 'emit');

    app.handleClick();

    expect(app.onClick.emit).toHaveBeenCalled();
  });
});
