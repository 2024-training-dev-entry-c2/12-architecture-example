import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/src/insfrastructure/ui/components/modal/modal.component';

@Component({
  selector: 'app-test',
  imports: [ModalComponent, ModalComponent],
  template: `
    <h1>Hola</h1>
    <lib-modal [action]="'test'">
      <p>esto es una prueba de la anidacion</p>
    </lib-modal>
  `,
})
export class TestComponent {}
