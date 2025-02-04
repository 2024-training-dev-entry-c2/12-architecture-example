import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

  describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TableComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(TableComponent);
      component = fixture.componentInstance;
      compiled = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render a table', () => {
      const table = compiled.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should render a table head', () => {
      const tableHead = compiled.querySelector('thead');
      expect(tableHead).toBeTruthy();
    });

    it('should render a table body', () => {
      const tableBody = compiled.querySelector('tbody');
      expect(tableBody).toBeTruthy();
    });

    it('should render a table row', () => {
      const tableRow = compiled.querySelector('tr');
      expect(tableRow).toBeTruthy();
    });

    it('should send an update event when sendEdit is called', () => {
      spyOn(component.update, 'emit');
      component.sendEdit(1);
      expect(component.update.emit).toHaveBeenCalledWith(1);
    });

    it('should send a delete event when sendDelete is called', () => {
      spyOn(component.delete, 'emit');
      component.sendDelete(1);
      expect(component.delete.emit).toHaveBeenCalledWith(1);
    });

    it('should send an openModal event when openForm is called', () => {
      spyOn(component.openModal, 'emit');
      component.openForm();
      expect(component.openModal.emit).toHaveBeenCalledWith(true);
    });

    it('should resolve field correctly', () => {
      const obj = { name: 'Test', details: { age: 30 } };
      const result = component.resolveField(obj, 'details.age');
      expect(result).toBe(30);
    });

    it('should resolve field for array correctly', () => {
      const obj = { dishes: [{ name: 'Pizza' }, { name: 'Pasta' }] };
      const result = component.resolveField(obj, 'dishes');
      expect(result).toBe('Pizza, Pasta');
    });

    it('should return null if path is null or undefined', () => {
      const obj = { name: 'Test' };
      expect(component.resolveField(obj, null)).toBeNull();
      expect(component.resolveField(obj, undefined)).toBeNull();
    });
    
  });
