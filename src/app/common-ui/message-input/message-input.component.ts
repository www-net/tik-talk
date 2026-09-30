import { Component, EventEmitter, inject, Output, Renderer2, WritableSignal } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { AvatarCircleComponent } from '../avatar-circle/avatar-circle.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  private readonly r2: Renderer2 = inject(Renderer2);
  public readonly me: WritableSignal<Profile | null> = inject(ProfileService).me;

  @Output() created: EventEmitter<string> = new EventEmitter<string>();

  public postText = '';

  public onTextAreaInput(event: Event): void {
    const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  public onCreatePost(): void {
    if (!this.postText) {
      return;
    }
    this.created.emit(this.postText);
    this.postText = '';
  }
}
