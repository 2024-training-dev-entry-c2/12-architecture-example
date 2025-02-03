import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('clientes', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.componentRef.setInput('clientes', []);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.clientes()).toEqual([]);
  });
});
