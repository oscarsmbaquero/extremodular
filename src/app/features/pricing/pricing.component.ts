import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConfiguratorService } from '../../core/services/configurator.service';
import { DataService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  configService = inject(ConfiguratorService);
  dataService = inject(DataService);
  router = inject(Router);
  fb = inject(FormBuilder);

  submitted = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  submit() {
    if (this.form.valid) {
      const budgetId = 'b_' + Math.random().toString(36).substr(2, 9);
      this.dataService.addBudget({
        id: budgetId,
        clientName: this.form.value.name!,
        clientEmail: this.form.value.email!,
        clientPhone: this.form.value.phone!,
        configuration: this.configService.config(),
        totalPrice: this.configService.totalPrice(),
        date: new Date().toISOString(),
        status: 'Pending'
      });
      
      // Also create a mock project for the dashboard demo
      this.dataService.projects.update(p => [...p, {
        id: 'prj_' + Math.random().toString(36).substr(2, 9),
        budgetId: budgetId,
        clientName: this.form.value.name!,
        status: 'Estudio Inicial',
        progress: 10,
        startDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString() // +120 days
      }]);

      this.submitted.set(true);
    }
  }
}
