import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  dataService = inject(DataService);
}
