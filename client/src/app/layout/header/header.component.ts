import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BusyService } from '../../core/service/busy.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIcon,MatButton, MatBadge, MatProgressBar, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  busyService = inject(BusyService);


}
