import { Component, input, InputSignal } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { Chat, LastMessageRes } from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  public readonly chat: InputSignal<LastMessageRes | undefined> =
    input<LastMessageRes>();
}
