import { Routes } from "@angular/router";
import { HomeContainerComponent } from "../containers/home-container/home-container.component";

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeContainerComponent
  }
]