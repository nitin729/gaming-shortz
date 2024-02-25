import { Component } from '@angular/core';
import { ClipComponent } from '../clip/clip.component';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SafeURLPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-clips-list',
  standalone: true,
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css',
  imports: [ClipComponent, CommonModule, RouterLink, SafeURLPipe],
})
export class ClipsListComponent {
  constructor(public storage: StorageService) {
    console.log(this.storage.clips());
  }
  ngOnInit() {
    console.log(this.storage.clips());
  }
}
