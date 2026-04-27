import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-custom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslatePipe],
  templateUrl: './custom.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class CustomComponent {}
