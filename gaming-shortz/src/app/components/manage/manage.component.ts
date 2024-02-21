import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Models } from 'appwrite';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  userClips!: Promise<Models.Document[] | null>;

  constructor(private auth: AuthService, private storage: StorageService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn() && this.auth.user()) {
      const userId = this.auth.user()?.$id ?? null;
      this.userClips = this.storage.getUserClips(userId);
    }
  }

  public deleteClip(userClip: any) {
    console.log(userClip['$id'], userClip['clipId']);

    this.userClips = this.storage.deleteUserClips(
      userClip['$id'],
      userClip['clipId']
    );
  }
}
