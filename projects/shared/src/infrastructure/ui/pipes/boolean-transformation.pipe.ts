import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTransformation'
})
export class BooleanTransformationPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    if(value === true)
      return 'Yes';
    return 'No';
  }

}