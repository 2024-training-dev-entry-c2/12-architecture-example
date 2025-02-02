import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from "../../components/home/home.component";
import { GetClientUseCase, Iclient } from 'clients';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-home-container',
  imports: [HomeComponent, AsyncPipe],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  private readonly _getClients = inject(GetClientUseCase);

  public client$: Observable<Iclient[]>;

  ngOnInit(): void {
    this._getClients.initSubscriptions();
    this._getClients.execute();
    this.client$ = this._getClients.client$()
  }

  ngOnDestroy() {
    this._getClients.destroySubscriptions();
  }


}
