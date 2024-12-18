import {Component, Input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {NgSwitchCase} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [
    NgSwitchCase,
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  standalone: true,
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
