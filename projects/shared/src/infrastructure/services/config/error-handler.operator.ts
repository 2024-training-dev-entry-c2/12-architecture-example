import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const handleHttpError = () => {
  return (source: Observable<any>): Observable<any> => {
    return new Observable((subscriber) => {
      return source.subscribe({
        next: (value) => subscriber.next(value),
        error: (error: HttpErrorResponse) => {
          subscriber.error(error);
        },
        complete: () => subscriber.complete(),
      });
    });
  };
};
