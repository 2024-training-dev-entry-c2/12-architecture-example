import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { ModalComponent } from 'shared';

@Component({
  selector: 'lib-update-client-form',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './update-client-form.component.html',
  styleUrls: ['./update-client-form.component.scss']
})
export class UpdateClientFormComponent implements OnInit {
  @Input() getData: IClient | null = null;
  @Input() getClientId: number = 0;
  @Output() updateClient = new EventEmitter<IClientRequest>();

  private formUpdateBuilder = inject(FormBuilder);

  public clientUpdatedForm = this.formUpdateBuilder.group({
    id: [{ value: 0, disabled: true }, [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.minLength(2), Validators.required]],
    isOften: [false],
    orderIds: this.formUpdateBuilder.array([]),
  });
  ngOnInit(): void {
    
    this.setValue();
  }

  setValue(): void {
    const orderIdsArray = this.clientUpdatedForm.get('orderIds') as FormArray;
    orderIdsArray.clear();
    if (this.getData.orderIds && Array.isArray(this.getData.orderIds)) {
      this.getData.orderIds.forEach((orderId: number) => {
        orderIdsArray.push(
          this.formUpdateBuilder.control(orderId, Validators.required)
        );
      });
    }
    console.log(this.getData);
    this.clientUpdatedForm.patchValue({
      id: this.getData.id,
      email: this.getData.email,
      name: this.getData.name,
      isOften: this.getData.isOften,
    });
    orderIdsArray.disable();
  }

  sendToUpdate() {
    this.updateClient.emit(
      this.clientUpdatedForm.getRawValue() as unknown as IClientRequest
    );
    setTimeout(() => {
      this.redirectToClient();
    }, 1000);
  }

  constructor(private router: Router) {}
  redirectToClient(): void {
    this.router.navigate(['/client']);
  }
}
