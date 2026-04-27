import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslatePipe],
  templateUrl: './home.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class HomeComponent {
  dataService = inject(DataService);
}
