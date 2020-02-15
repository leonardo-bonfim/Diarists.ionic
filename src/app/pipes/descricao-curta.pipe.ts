import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoCurta'
})
export class DescricaoCurtaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return String(value).substr(0, 70).concat('...');
  }

}
