import { Component,Input } from '@angular/core';
import { IClient } from '../../../../domain/model/client.model';

@Component({
  selector: 'lib-get-by-id-client-comp',
  imports: [],
  templateUrl: './get-by-id-client-comp.component.html',
  styleUrl: './get-by-id-client-comp.component.scss'
})
export class GetByIdClientCompComponent {
  @Input() client!: IClient;
}
