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
    console.log(this.file);
    this.title.setValue(this.file.name);
    this.isNextStep.set(true);
  }

  async uploadFile() {
    await this.storage.createFile(this.file as File);
    let shortzObj = {
      id: this.storage.clipId(),
      title: this.title.value || '',
      createdAt: this.storage.clip().$createdAt,
      createdBy: this.auth.user()?.name,
    };
    await this.storage.createSortzDocument(shortzObj);
    this.isNextStep.set(false);
    this.file = null;
    this.title.setValue('');
    this.router.navigate(['/']);
    console.log('successfully');
  }
}
