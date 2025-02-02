import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientComponent } from './table-client.component';
import { By } from '@angular/platform-browser';

describe('TableClientComponent', () => {
  let component: TableClientComponent;
  let fixture: ComponentFixture<TableClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate the top 10 clients based on total price', () => {
    const mockOrders = [
      { client: { id: 1, name: 'Client 1' }, totalPrice: 100 },
      { client: { id: 2, name: 'Client 2' }, totalPrice: 200 },
      { client: { id: 1, name: 'Client 1' }, totalPrice: 50 },
      { client: { id: 3, name: 'Client 3' }, totalPrice: 150 },
      { client: { id: 2, name: 'Client 2' }, totalPrice: 100 },
      { client: { id: 1, name: 'Client 1' }, totalPrice: 25 },
      { client: { id: 4, name: 'Client 4' }, totalPrice: 300 }
    ];
    component.order = mockOrders;
    component.getTopClients();

    expect(component.topClientes.length).toBe(4); // Only 4 clients in mock data
    expect(component.topClientes[0].name).toBe('Client 2');
    expect(component.topClientes[0].totalPrice).toBe(300);
    expect(component.topClientes[1].name).toBe('Client 4');
    expect(component.topClientes[1].totalPrice).toBe(300);
    expect(component.topClientes[2].name).toBe('Client 1');
    expect(component.topClientes[2].totalPrice).toBe(175);
    expect(component.topClientes[3].name).toBe('Client 3');
    expect(component.topClientes[3].totalPrice).toBe(150);
  });


  it('should render the top clients in the table', () => {
    const mockOrders = [
      { client: { id: 1, name: 'Client 1' }, totalPrice: 100 },
      { client: { id: 2, name: 'Client 2' }, totalPrice: 200 }
    ];
    component.order = mockOrders;
    component.getTopClients();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Client 2');
    expect(rows[0].nativeElement.textContent).toContain('1Client 21$200');//por el currency pipe
    expect(rows[1].nativeElement.textContent).toContain('Client 1');
    expect(rows[1].nativeElement.textContent).toContain('2Client 11$100');
  });
  it('should display correct ranking for top clients', () => {
    const mockOrders = [
      { client: { id: 1, name: 'Client 1' }, totalPrice: 100 },
      { client: { id: 2, name: 'Client 2' }, totalPrice: 200 },
      { client: { id: 3, name: 'Client 3' }, totalPrice: 300 }
    ];
    component.order = mockOrders;
    component.getTopClients();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.textContent).toContain('1');
    expect(rows[1].nativeElement.textContent).toContain('2');
    expect(rows[2].nativeElement.textContent).toContain('3');
  });
});
