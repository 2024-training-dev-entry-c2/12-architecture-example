import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuComponent } from './list-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ListMenuComponent', () => {
  let component: ListMenuComponent;
  let fixture: ComponentFixture<ListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenuComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
