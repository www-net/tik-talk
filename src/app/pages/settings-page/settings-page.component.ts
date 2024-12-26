import { Component } from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';

@Component({
  selector: 'app-settings-page',
  imports: [
    ProfileHeaderComponent
  ],
  templateUrl: './settings-page.component.html',
  standalone: true,
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {

}
