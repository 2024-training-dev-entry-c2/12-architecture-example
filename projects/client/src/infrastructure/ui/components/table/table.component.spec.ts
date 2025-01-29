import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientComponent } from './table.component';

describe('TableComponent', () => {
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
});
