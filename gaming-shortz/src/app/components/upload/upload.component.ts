import { Component, signal } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { InputComponent } from '../../shared/input/input.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Clip } from '../../models/Clip';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    EventBlockerDirective,
    CommonModule,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  file!: File | null;
  isDragOver = signal(false);
  isNextStep = signal(false);
  title = new FormControl('', [Validators.required]);
  uploadForm = new FormGroup({
    title: this.title,
  });

  constructor(
    private storage: StorageService,
    private router: Router,
    private auth: AuthService
  ) {}

  storeFile($event: Event): void {
    this.isDragOver.set(false);
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      alert('Only mp4 files are allowed');
      return;
    }
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.isNextStep.set(true);
  }

  async upload() {
    await this.storage.uploadClip(this.file as File);
    let clipObj: Clip = {
      /* title: this.title.value || '',
      userId: this.auth.user()?.$id,
      createdAt: this.storage.clip().$createdAt,
      createdBy: this.auth.user()?.name, */
      userId: this.auth.user()?.$id,
      clipId: this.storage.clip().$id,
      screenshotUrl: '',
      title: this.title.value || '',
      timestamp: this.storage.clip().$createdAt,
      userName: this.auth.user()?.name,
    };
    await this.storage.createClipDocument(clipObj);
    this.isNextStep.set(false);
    this.file = null;
    this.title.setValue('');
    this.router.navigate(['/']);
  }
}
