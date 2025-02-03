import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MenusComponent } from './menus.component';
import { IMenuResponse } from '../../../../domain/model/menu.model';
import { By } from '@angular/platform-browser';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;

  const mockMenus: IMenuResponse[] = [
    {
      id: 1,
      menuName: 'Desayuno',
      description: 'Comidas de primera entrega',
      active: true,
    },
    {
      id: 2,
      menuName: 'Almuerzo',
      description: 'Comidas de segunda entrega',
      active: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;
    component.menus$ = of(mockMenus);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Menús"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1').textContent).toContain('Menús');
  });

  it('should have "Crear nuevo menú" button', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(
      By.css('.entity__create-button')
    ).nativeElement;
    expect(buttonElement.textContent).toContain('Crear nuevo menú');
  });

  it('should render menus in the table', () => {
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Desayuno');
    expect(rows[1].nativeElement.textContent).toContain('Almuerzo');
  });
});
