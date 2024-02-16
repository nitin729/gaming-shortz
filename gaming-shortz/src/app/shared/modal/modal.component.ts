import { Component, ElementRef } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(private sharedService: SharedService, private el: ElementRef) {}

  // ngOnInit() {
  //   this.sharedService.registerModal('auth');
  //   document.body.appendChild(this.el.nativeElement);
  // }
}
