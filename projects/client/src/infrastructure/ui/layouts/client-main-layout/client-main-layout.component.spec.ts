import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMainLayoutComponent } from './client-main-layout.component';

describe('MainLayoutComponent', () => {
  let component: ClientMainLayoutComponent;
  let fixture: ComponentFixture<ClientMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
