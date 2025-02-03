import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContainerComponent } from '../../util/container/container.component';
import { DynamicTableComponent } from '../../util/dynamic-table/dynamic-table.component';
import { ButtonComponent } from '../../util/button/button.component';
import { DialogComponent } from '../../util/dialog/dialog.component';
import { CustomerDialogService } from '../../../../services/customer-dialog.service';
import { CustomerService } from '../../../../services/customer.service';
import { DialogUaserAdminComponent } from './dialog-uaser-admin/dialog-uaser-admin.component';
import { IUserSystem } from '../../../../../domain/model/user-system.model';
import { CommonModule } from '@angular/common';
import { InputFloatComponent } from '../../util/input-float/input-float.component';
import { ConfirmationDialogComponent } from '../../util/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../util/input/input.component';
import { NotificationComponent } from '../../util/notification/notification.component';
import { Customer } from '../../../../../domain/model/customer';
import { NotificationService } from '../../util/notification/notification.service';

@Component({
  selector: 'lib-user-admin',
  imports: [ContainerComponent, DynamicTableComponent, ButtonComponent, DialogComponent, DialogUaserAdminComponent,
    ConfirmationDialogComponent, CommonModule, InputFloatComponent, ReactiveFormsModule, InputComponent, NotificationComponent
  ],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss'
})
export class UserAdminComponent implements OnInit, OnDestroy {

  ///#region 
  // private notificationService: NotificationService,
  private notificationService = inject(NotificationService);

  customerForm: FormGroup;
  customer: Customer | null = null;

  @Output() closeDialog = new EventEmitter<void>();
  isActive: boolean = false;
  TYPE_OPERATION: string | null = null;

  isDialogOpen = false;

  onSubmit() {
    if (this.customerForm.valid) {
      this.isDialogOpen = true;
    } else {
      console.log('Formulario inválido');
      this.showToast('Revise que el formulario esté completo', 'warning');
    }
  }


  onClose() {
    this.closeDialog.emit();
  }

  showToast(messageToast: string, typeToast?: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      message: messageToast,
      type: typeToast,
      duration: 3000
    });
  }

  onConfirm() {
    this.isDialogOpen = false;
    const customerData = this.customerForm.value;

    if (this.TYPE_OPERATION === 'E' && this.customer) {
      const updatedCustomerData = { ...customerData, aggregateId: this.customer.id };

      this.customerService.updateCustomer(updatedCustomerData).subscribe(
        (updatedCustomer) => {
          this.showToast('Cliente actualizado con éxito', 'success');
          this.customerDialogService.emitRefreshTable();
          this.onClose();
        },
        (error) => {
          const errorMessage = error.message || 'Hubo un error al actualizar el cliente';
          console.log('Error al actualizar el cliente:', error);
          this.showToast(errorMessage, 'warning');
        }
      );
    } else if (this.TYPE_OPERATION === 'C') {
      this.customerService.createCustomer(customerData).subscribe(
        (newCustomer) => {
          console.log('Cliente creado con éxito:', newCustomer);
          this.showToast('Cliente creado con éxito', 'success');
          this.customerDialogService.emitRefreshTable();
          this.onClose();
        },
        (error) => {
          const errorMessage = error.message || 'Hubo un error al crear el cliente';
          console.log('Error al crear el cliente:', error);
          this.showToast(errorMessage, 'warning');
        }
      );
    }
  }

  onCancel() {
    this.isDialogOpen = false;
    this.onClose();
  }

  //#endregion

  userAdminSelected: IUserSystem = {};

  columns = [
    { key: 'id', label: 'id', sortable: true, hidden: false },
    { key: 'firstname', label: 'First Name', sortable: true, hidden: false },
    { key: 'lastName', label: 'Last Name', sortable: true, hidden: true },
    { key: 'email', label: 'Email', sortable: true, hidden: true },
    { key: 'password', label: 'Password', sortable: true, hidden: true },
    { key: 'role', label: 'Role', sortable: true, hidden: true },
  ];



  loading = false;
  disableInputs: boolean = true;

  error = null;
  private subscription = new Subscription();
  data: IUserSystem[] = [];

  showDialog = false;

  constructor(private customerDialogService: CustomerDialogService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.subscription.add(
      this.customerDialogService.refreshTable$.subscribe(() => {
        this.loadCustomers();
      })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCustomers() {
    this.loading = true;
    this.error = null;
    this.subscription.add(this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.data = customers;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      }

    }));

  }

  abrirDialogo(userAdmin?: IUserSystem) {
    this.userAdminSelected = userAdmin || {};
    this.showDialog = true;
    this.customerDialogService.sendCustomer(userAdmin || null);
  }

  onInformation(event: any) {
    this.customerDialogService.sendIsActive(true);
    this.customerDialogService.sndTypeOperation("I");
    this.abrirDialogo(event);
  }

  onCreate() {
    this.customerDialogService.sendIsActive(false);
    this.customerDialogService.sndTypeOperation("C");
    this.abrirDialogo();
  }

  onEdit(event: any) {
    this.customerDialogService.sendIsActive(false);
    this.customerDialogService.sndTypeOperation("E");
    this.abrirDialogo(event);
  }

  onDelete(event: any) {
    console.table(event);
  }







}

