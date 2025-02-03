import { Routes } from "@angular/router";
import { HomeSectionComponent } from "../../components/home-section/home-section.component";



export const homeRoutes:Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: HomeSectionComponent
      }
    ]
  }
];