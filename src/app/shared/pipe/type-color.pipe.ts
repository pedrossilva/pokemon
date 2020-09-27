import { Pipe, PipeTransform } from '@angular/core';
import {Settings} from '../../settings';

@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string): unknown {
    return Settings.colours[value] || '#777';
  }

}
