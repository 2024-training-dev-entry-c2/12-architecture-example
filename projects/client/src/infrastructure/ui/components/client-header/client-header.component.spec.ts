import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientHeaderComponent } from './client-header.component';
import { Component, EventEmitter } from '@angular/core';
import { ClientFormComponent } from '../../forms/client-form/client-form.component';
import { By } from '@angular/platform-browser';
import { IClient } from '../../../../domain/model/clients.model';

@Component({
  selector: 'lib-header',
  template: '<button (click)="actionConfirmed.emit()"></button>'
})
class MockHeaderComponent {
  actionConfirmed = new EventEmitter<void>();
}

@Component({
  selector: 'lib-client-form',
  template: '',
})
class MockClientFormComponent {
  form = {
    valid: true,
    reset: jasmine.createSpy('reset')
  };

  getFormData() {
    return { clientName: 'Test Client' } as IClient;
  }

  resetForm() {
    this.form.reset();
  }
}

describe('ClientHeaderComponent', () => {
  let component: ClientHeaderComponent;
  let fixture: ComponentFixture<ClientHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientHeaderComponent, MockClientFormComponent, MockHeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHeaderComponent);
    component = fixture.componentInstance;

    component.clientForm = fixture.debugElement.query(By.directive(MockClientFormComponent)).componentInstance;
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmitClient when form is valid', () => {
    spyOn(component.onSubmitClient, 'emit');
    spyOn(component.clientForm, 'resetForm');

    component.submitClient();

    expect(component.onSubmitClient.emit).toHaveBeenCalledWith({ clientName: 'Test Client'} as IClient);
    expect(component.clientForm.resetForm).toHaveBeenCalled();
  });

  it('should trigger submitClient when actionConfirmed is emitted', () => {
    spyOn(component, 'submitClient');
    
    const header = fixture.debugElement.query(By.css('lib-header')).componentInstance;
    header.actionConfirmed.emit();

    expect(component.submitClient).toHaveBeenCalled();
  });
});
