import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConfiguratorService } from '../../core/services/configurator.service';
import { DataService } from '../../core/services/data.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-configurator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent {
  configService = inject(ConfiguratorService);
  dataService = inject(DataService);
  router = inject(Router);

  requested = signal(false);

  constructor() {
    if (!this.configService.config().modelId) {
      const firstModel = this.dataService.models()[0];
      if (firstModel) {
        this.configService.setModel(firstModel.id);
      }
    }
  }

  requestQuote() {
    this.requested.set(true);
    // In a real app, we would send the data here
  }

  updateModules(delta: number) {
    const current = this.configService.config().modules;
    this.configService.setModules(current + delta);
  }

  hasExtra(id: string): boolean {
    return !!this.configService.config().extras.find(e => e.id === id);
  }
}
