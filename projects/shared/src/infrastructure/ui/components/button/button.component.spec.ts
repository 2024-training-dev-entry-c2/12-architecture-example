import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Componente de prueba que actúa como el componente padre
@Component({
  standalone: true,
  imports: [ButtonComponent], // Importar el componente Button aquí
  template: `
    <lib-button [text]="text" [theme]="theme" (onClick)="onButtonClick()"></lib-button>
  `,
})
class TestHostComponent {
  text = 'Haz clic aquí';
  theme: 'primary' | 'info' | 'danger' = 'primary';
  onButtonClick() {}
}

describe('ButtonComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent], // Ahora solo importas TestHostComponent
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería mostrar el texto correcto', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Haz clic aquí');
  });

  it('debería aplicar la clase CSS correcta según el tema', () => {
    testHost.theme = 'danger';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.classList).toContain('button--danger');
  });

  it('debería emitir el evento onClick cuando se hace clic en el botón', () => {
    spyOn(testHost, 'onButtonClick');
    
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();

    expect(testHost.onButtonClick).toHaveBeenCalled();
  });
});
