import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClientsComponent } from './get-clients.component';

describe('GetClientsComponent', () => {
  let component: GetClientsComponent;
  let fixture: ComponentFixture<GetClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
