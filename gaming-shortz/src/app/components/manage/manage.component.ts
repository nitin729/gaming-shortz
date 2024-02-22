import { Component, signal } from '@angular/core';
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, InputComponent, EditClipComponent, RouterLink],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  userClips!: Models.Document[] | null;
  activeClip: any;
  sortOption = signal('ASCE');
  constructor(
    private auth: AuthService,
    public storage: StorageService,
    private modal: ModalService
  ) {}
  ngOnInit() {
    this.getClips();
  }

  public getClips() {
    if (this.auth.isLoggedIn() && this.auth.user()) {
      const userId = this.auth.user()?.$id ?? null;
      from(this.storage.getUserClips(userId, this.sortOption())).subscribe(
        (clips) => {
          this.userClips = clips;
        }
      );
    }
  }

  public onFilterChange(value: string) {
    this.sortOption.set(value);
    this.getClips();
  }

  public deleteClip(userClip: Models.Document) {
    this.storage.deleteUserClips(userClip['$id'], userClip['clipId']);
  }

  public openModal($event: Event, userClip: Models.Document) {
    $event.preventDefault();
    // this.storage.activeClip.set(userClip);
    this.activeClip = userClip;
    console.log(userClip, this.activeClip);

    this.modal.toggleModal('edit-clip');
  }

  public updateClip($event: { title: string; id: string }) {
    this.storage.updateClipDocument($event.id, $event.title);
    this.userClips?.forEach((userClip) => {
      if (userClip['$id'] === $event.id) {
        userClip['title'] = $event.title;
      }
    });
  }
}
