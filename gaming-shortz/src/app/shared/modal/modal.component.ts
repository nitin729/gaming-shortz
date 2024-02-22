import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() modalId: string = '';

  constructor(public modal: ModalService, private el: ElementRef) {}

  closeModal() {
    console.log(this.modalId);

    this.modal.toggleModal(this.modalId);
  }
  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement);
  }
}
