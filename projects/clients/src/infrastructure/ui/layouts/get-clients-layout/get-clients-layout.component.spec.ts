import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClientsLayoutComponent } from './get-clients-layout.component';

describe('GetClientsLayoutComponent', () => {
  let component: GetClientsLayoutComponent;
  let fixture: ComponentFixture<GetClientsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetClientsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetClientsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
