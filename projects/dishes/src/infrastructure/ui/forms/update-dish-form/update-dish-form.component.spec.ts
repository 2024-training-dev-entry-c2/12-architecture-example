// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UpdateDishFormComponent } from './update-dish-form.component';
// import { ActivatedRoute } from '@angular/router';

// describe('UpdateDishFormComponent', () => {
//   let component: UpdateDishFormComponent;
//   let fixture: ComponentFixture<UpdateDishFormComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UpdateDishFormComponent], // Asegúrate de que el componente esté en imports
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
//                       return '20.0';
//                     case 'isPopular':
//                       return 'false';
//                     case 'menuId':
//                       return '1';
//                     default:
//                       return null;
//                   }
//                 },
//               },
//             },
//           },
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(UpdateDishFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
