import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersComponent } from './customers.component';
import { of } from 'rxjs';
import { ICustomerResponse } from '../../../../domain/model/customer.model';
import { By } from '@angular/platform-browser';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  const mockCustomers: ICustomerResponse[] = [
    {
      id: 1,
      name: 'Juan',
      lastName: 'Perez',
      email: 'juan@example.com',
      phone: '123456789',
      address: 'Calle 123',
      isFrequent: true,
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Lopez',
      email: 'maria@example.com',
      phone: '987654321',
      address: 'Avenida 456',
      isFrequent: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    component.customers$ = of(mockCustomers);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "Clientes"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1').textContent).toContain('Clientes');
  });

  it('should have "Crear nuevo cliente" button', () => {
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(
      By.css('.entity__create-button')
    ).nativeElement;
    expect(buttonElement.textContent).toContain('Crear nuevo cliente');
  });

  it('should render customers in the table', () => {
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Juan');
    expect(rows[1].nativeElement.textContent).toContain('Maria');
  });
});
