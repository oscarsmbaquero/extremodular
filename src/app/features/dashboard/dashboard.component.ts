import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dataService = inject(DataService);

  // For demo purposes, just grab the last project
  project = computed(() => {
    const projects = this.dataService.projects();
    return projects.length > 0 ? projects[projects.length - 1] : null;
  });

  steps = [
    { name: 'Estudio Inicial' },
    { name: 'Fabricación' },
    { name: 'Transporte' },
    { name: 'Montaje' },
    { name: 'Entregado' }
  ];

  currentStepIndex = computed(() => {
    const p = this.project();
    if (!p) return -1;
    return this.steps.findIndex(s => s.name === p.status);
  });

  isStepCompleted(index: number): boolean {
    return index < this.currentStepIndex();
  }

  isCurrentStep(index: number): boolean {
    return index === this.currentStepIndex();
  }
}
