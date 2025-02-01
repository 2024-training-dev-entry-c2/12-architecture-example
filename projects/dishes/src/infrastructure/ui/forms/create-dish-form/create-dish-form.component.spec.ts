// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CreateDishFormComponent } from './create-dish-form.component';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';

// describe('CreateDishFormComponent', () => {
//   let component: CreateDishFormComponent;
//   let fixture: ComponentFixture<CreateDishFormComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CreateDishFormComponent],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               paramMap: {
//                 get: (key: string) => {
//                   switch (key) {
//                     case 'name':
//                       return 'Pizza';
//                     case 'price':
//                       return '10.0';
//                     case 'isPopular':
//                       return 'false';
//                     default:
//                       return null;
//                   }
//                 },
//               },
//             },
//             queryParams: of({}), // Si necesitas simular parámetros de consulta
//           },
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CreateDishFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
