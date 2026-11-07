import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environments';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    // TODO
    // return `https://icherniakov.ru/yt-course/${value}`;
    return `${environment.BASE_API_URL}${value}`;
  }
}
