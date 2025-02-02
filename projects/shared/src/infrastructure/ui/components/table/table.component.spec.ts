import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.title = 'Test Table';
    component.data = [
      { id: 1, name: 'Item 1', price: 100, localDate: '2024-02-01T10:00:00' },
      { id: 2, name: 'Item 2', price: 200, localDate: '2024-02-02T12:00:00' },
    ];
    component.isLoading = false;
    component.isError = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the correct title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.card__title')
    ).nativeElement;
    expect(titleElement.textContent).toContain('Test Table');
  });
  it('should render the correct number of table headers', () => {
    const headers = fixture.debugElement.queryAll(
      By.css('.styled-table__header')
    );
    expect(headers.length).toBe(4); // id, name, price, localDate
    expect(headers.map((h) => h.nativeElement.textContent.trim())).toEqual([
      'id',
      'name',
      'price',
      'localDate',
    ]);
  });
  it('should display the formatted price with currency', () => {
    const priceCells = fixture.debugElement.queryAll(
      By.css('.styled-table__cell')
    );
    expect(priceCells[2].nativeElement.textContent).toContain('$100.00'); // Verifica el primer precio
  });
  it('should emit updateId event when update button is clicked', () => {
    spyOn(component.updateId, 'emit');
    const updateButton = fixture.debugElement.query(
      By.css('.actions__items lib-buttons[ariaLabel="Edit"]')
    );
    updateButton.triggerEventHandler('buttonClick', null);
    expect(component.updateId.emit).toHaveBeenCalledWith(1); // Debe emitir el id correcto
  });
  it('should not render table when there is an error', () => {
    component.isError = 'Error loading data';
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('.styled-table'));
    expect(table).toBeFalsy();
  });
});
