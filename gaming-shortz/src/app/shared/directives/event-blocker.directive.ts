import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]',
  standalone: true,
})
export class EventBlockerDirective {
  constructor() {}
  @HostListener('dragover', ['$event'])
  @HostListener('drop', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
