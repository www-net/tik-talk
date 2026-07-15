import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileService } from '../../data/services/profile.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  standalone: true,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // TODO  -----------
  profileService = inject(ProfileService);
  authService = inject(AuthService);

  ngOnInit() {
    console.log(`ngOnInit`);

    this.profileService.getMe().subscribe((val) => {
      console.log(`ngOnInit val: `, val);
    });

    console.log(`this.authService.token: `, this.authService.token);

    console.log(
      `this.authService.refreshToken: `,
      this.authService.refreshToken,
    );
  }

  // --------------
}
