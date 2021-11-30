import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textpipe'
})
export class TextpipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value>15) {
      return value.substring(0,15);
    }
    return null;
  }

}
