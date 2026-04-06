import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './contact.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class ContactComponent {
  submitted = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
  }
}
