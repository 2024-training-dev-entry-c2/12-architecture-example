import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetUserUsecase } from '../../../../application/clients/get-client.usercase';
import { IClient, IClientRequest } from '../../../../domain/model/client.model';
import { ActivatedRoute } from '@angular/router';
import { UpdateClientUsecase } from '../../../../application/clients/update-client.usercase';
import { UpdateClientFormComponent } from '../../forms/update-client-form/update-client-form.component';
import { ListClientComponent } from '../list-client/list-client.component';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-update-client',
  imports: [UpdateClientFormComponent, ListClientComponent],
  templateUrl: './update-client.component.html',
})
export class UpdateClientComponent implements OnInit, OnDestroy {
  private readonly __useCaseGet = inject(GetUserUsecase);
  private readonly __useCaseUpdate = inject(UpdateClientUsecase);

  client: IClient | null = null;

  clientId: number;
  private readonly destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.route.params
      .pipe(
        switchMap((params) => {
          const id = Number(params['id']);
          console.log('ID del cliente:', id);

          this.__useCaseGet.execute(id);
          return this.__useCaseGet.user$();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (client: IClient | null) => {
          console.log('Cliente obtenido en el componente:', client); // Depuración
          this.client = client;
        },
        error: (err) => console.error('Error al obtener cliente:', err),
      });
  }

  UpdateClient(user: IClientRequest) {
    this.__useCaseUpdate.execute(user, this.clientId);
    this.client = null;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
