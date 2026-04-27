import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ConfiguratorService } from '../../core/services/configurator.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  dataService = inject(DataService);
  configService = inject(ConfiguratorService);
  router = inject(Router);

  configure(modelId: string) {
    this.configService.setModel(modelId);
    this.router.navigate(['/configurator']);
  }
}
