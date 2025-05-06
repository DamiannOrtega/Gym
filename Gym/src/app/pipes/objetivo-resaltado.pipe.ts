import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objetivoResaltado',
  standalone: true
})
export class ObjetivoResaltadoPipe implements PipeTransform {

  transform(value: string): string {
    return `🎯 ${value.toUpperCase()}`;
  }

}
