import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeURL',
  standalone: true,
})
export class SafeURLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustUrl;
  }
}
