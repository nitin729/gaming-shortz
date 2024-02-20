import { Component } from '@angular/core';
import { ClipComponent } from '../clip/clip.component';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clips-list',
  standalone: true,
  imports: [ClipComponent, CommonModule, RouterLink],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css',
})
export class ClipsListComponent {
  constructor(public storage: StorageService) {}
}
