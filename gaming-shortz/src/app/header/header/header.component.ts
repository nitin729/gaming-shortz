import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private sharedService: SharedService) {}

  openAuthModal($event: Event) {
    $event.preventDefault();
    this.sharedService.toggleModal('auth');
  }
}