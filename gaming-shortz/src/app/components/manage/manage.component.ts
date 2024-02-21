import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Models } from 'appwrite';
import { InputComponent } from '../../shared/input/input.component';
import { FormControl } from '@angular/forms';
import { EditClipComponent } from '../edit-clip/edit-clip.component';
import { ModalService } from '../../services/modal.service';
import { Clip } from '../../models/Clip';
import { from } from 'rxjs';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, InputComponent, EditClipComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  userClips!: Models.Document[] | null;
  activeClip: any;
  constructor(
    private auth: AuthService,
    public storage: StorageService,
    private modal: ModalService
  ) {}
  ngOnInit() {
    if (this.auth.isLoggedIn() && this.auth.user()) {
      const userId = this.auth.user()?.$id ?? null;
      from(this.storage.getUserClips(userId)).subscribe((clips) => {
        this.userClips = clips;
      });
    }
  }

  public deleteClip(userClip: Models.Document) {
    this.storage.deleteUserClips(userClip['$id'], userClip['clipId']);
  }

  public openModal($event: Event, userClip: Models.Document) {
    $event.preventDefault();
    // this.storage.activeClip.set(userClip);
    this.activeClip = userClip;
    this.modal.toggleModal('edit-clip');
  }

  public updateClip(userClip: Models.Document) {}
}
