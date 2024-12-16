import {Component, Input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [
    NgSwitchCase
  ],
  templateUrl: './profile-card.component.html',
  standalone: true,
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
