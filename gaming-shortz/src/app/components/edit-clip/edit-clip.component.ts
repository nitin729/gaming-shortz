import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { InputComponent } from '../../shared/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Models } from 'appwrite';

@Component({
  selector: 'app-edit-clip',
  standalone: true,
  imports: [ModalComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './edit-clip.component.html',
  styleUrl: './edit-clip.component.css',
})
export class EditClipComponent {
  @Input() activeClip!: any;
  @Output() update = new EventEmitter();
  constructor(public modal: ModalService, public storage: StorageService) {}

  title = new FormControl('');
  id = new FormControl('');
  ngOnInit(): void {
    this.modal.registerModal('edit-clip');
  }

  ngOnDestroy(): void {
    this.modal.unregisterModal('edit-clip');
  }
  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }
    this.title.setValue(this.activeClip['title']);
    this.id.setValue(this.activeClip['$id']);
  }

  updateForm($event: Event) {
    $event.preventDefault();
    this.update.emit({
      title: this.title.value,
      id: this.id.value,
    });
    this.modal.toggleModal('edit-clip');
  }
}
