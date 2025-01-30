import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTableComponent } from './board-table.component';

describe('BoardTableComponent', () => {
  let component: BoardTableComponent;
  let fixture: ComponentFixture<BoardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
