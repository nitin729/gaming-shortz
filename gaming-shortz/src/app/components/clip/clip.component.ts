import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Models } from 'appwrite';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
@Component({
  selector: 'app-clip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ClipComponent {
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef;
  player?: Player;
  videoURL: string | null | undefined = null;
  constructor(
    public auth: AuthService,
    public storage: StorageService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement);

    this.route.params.subscribe((params) => {
      this.videoURL = this.storage.getFileView(params['id'])?.toString();
      this.player?.src({
        src: this.videoURL?.toString(),
        type: 'video/mp4',
      });
    });

    //  this.videoURL = this.storage.getFileView('65d46ce5448a1e8df50d');
  }
}
