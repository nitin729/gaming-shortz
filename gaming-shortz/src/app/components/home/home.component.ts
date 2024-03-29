import { Component } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { ClipsListComponent } from '../clips-list/clips-list.component';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IntroComponent, ClipsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private storage: StorageService, private auth: AuthService) {}

  ngOnInit() {
    this.storage.getAllClips();
    console.log(this.auth.isLoggedIn());
    console.log(this.storage.clips());
  }
  ngOnChanges() {
    console.log(this.auth.isLoggedIn());
    console.log(this.storage.clips());
  }
}
