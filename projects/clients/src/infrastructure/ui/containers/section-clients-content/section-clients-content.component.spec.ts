import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClientsContentComponent } from './section-clients-content.component';

describe('SectionClientsContentComponent', () => {
  let component: SectionClientsContentComponent;
  let fixture: ComponentFixture<SectionClientsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionClientsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionClientsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
