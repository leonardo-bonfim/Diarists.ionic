import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanciaFormatada'
})
export class DistanciaFormatadaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const distancia = Number(value).toFixed(0);
    return distancia + ' metros';
  }

}
