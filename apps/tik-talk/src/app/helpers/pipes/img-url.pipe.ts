import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environments';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return 'assets/images/avatar-placeholder.svg';
    return `${environment.BASE_API_URL}${value}`;
  }
}
