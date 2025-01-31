import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl } from "@angular/forms";
import { IInput, ITableHeader } from "../../interfaces";
import { TableComponent } from "./table.component";

describe('TableComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TableComponent],
      }).compileComponents();
    });
  
    it('should create the component', () => {
      const fixture = TestBed.createComponent(TableComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should render the elements', () => {
        const fixture = TestBed.createComponent(TableComponent);
        const compiled = fixture.nativeElement as HTMLElement;
  
        const tableHeader: ITableHeader[] = [{
            name: 'name',
            key: 'key1',
            type: 'text',
        }];

        const tableBody= [
            {
                key1: 'name1',
            },
        ];

        fixture.componentRef.setInput('dataHeader', tableHeader);
        fixture.componentRef.setInput('dataBody', tableBody);
        fixture.detectChanges();
    
        const tableElement = compiled.querySelector('table');
        const itemElement = compiled.querySelectorAll('.table__cell');

        expect(tableElement).toBeTruthy();
        expect(itemElement.length).toBe(tableBody.length);
      
    });

});
