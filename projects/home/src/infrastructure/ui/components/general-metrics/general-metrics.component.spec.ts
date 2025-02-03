import { TestBed } from '@angular/core/testing';
import { GeneralMetricsComponent } from './general-metrics.component';

describe('GeneralMetricsComponent', () => {
  it('clientes', () => {
    const fixture = TestBed.createComponent(GeneralMetricsComponent);
    fixture.componentRef.setInput('clientes', []);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.clientes()).toEqual([]);
  });
});
