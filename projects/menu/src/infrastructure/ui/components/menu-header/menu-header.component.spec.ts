import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuHeaderComponent } from './menu-header.component';
import { By } from '@angular/platform-browser';

describe('MenuHeaderComponent', () => {
  let component: MenuHeaderComponent;
  let fixture: ComponentFixture<MenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHeaderComponent] // 🔹 Lo movemos a imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Menus"', () => {
    const headerElement = fixture.debugElement.query(By.css('lib-header'));
    expect(headerElement.attributes['title']).toBe('Menus');
  });

  it('should display the button text "Agregar Menu"', () => {
    const headerElement = fixture.debugElement.query(By.css('lib-header'));
    expect(headerElement.attributes['buttonText']).toBe('Agregar Menu');
  });

  it('should contain the correct modal title "Agregar Nuevo Menu"', () => {
    const headerElement = fixture.debugElement.query(By.css('lib-header'));
    expect(headerElement.attributes['modalTitle']).toBe('Agregar Nuevo Menu');
  });
});
