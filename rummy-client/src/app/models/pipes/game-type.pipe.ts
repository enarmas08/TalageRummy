import { Pipe, PipeTransform } from '@angular/core';
import { GameType } from '../enums/gameType.enum';

@Pipe({
  name: 'filterGameType'
})
export class FilterGameTypePipe implements PipeTransform {

  transform(value: GameType): string {

    if (value != null) {
      return GameType[value];
    }

    return 'null';
  }

}
