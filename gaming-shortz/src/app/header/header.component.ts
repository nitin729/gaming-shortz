import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUser: String = '';

  constructor(
    public router: Router,
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.authService.isLoggedIn.set(false);
    this.authService.user.set(null);
    this.storage.clips.set([]);
    this.storage.clip.set({
      $id: '',
      bucketId: '',
      $createdAt: '',
      $updatedAt: '',
      $permissions: [],
      name: '',
      signature: '',
      mimeType: '',
      sizeOriginal: 0,
      chunksTotal: 0,
      chunksUploaded: 0,
    });
    this.storage.userClips.set([]);
    this.router.navigate(['/login']);
  }
}
