import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientComponent } from './list-client.component';
import { HttpClientModule } from '@angular/common/http';

describe('ListClientComponent', () => {
  let component: ListClientComponent;
  let fixture: ComponentFixture<ListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
