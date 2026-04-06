import { Injectable, computed, inject, signal } from '@angular/core';
import { Configuration, Extra } from '../models/house-model';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorService {
  private dataService = inject(DataService);

  // State
  config = signal<Configuration>({
    modelId: null,
    modules: 1,
    distributionShape: 'Lineal',
    packId: 'p1',
    extras: []
  });

  // Selectors
  selectedModel = computed(() => {
    const modelId = this.config().modelId;
    return this.dataService.models().find(m => m.id === modelId) || null;
  });

  selectedPack = computed(() => {
    const packId = this.config().packId;
    return this.dataService.packs().find(p => p.id === packId) || null;
  });

  totalArea = computed(() => {
    const model = this.selectedModel();
    if (!model) return 0;
    return model.area + ((this.config().modules - 1) * 30);
  });

  totalPrice = computed(() => {
    const model = this.selectedModel();
    const pack = this.selectedPack();
    if (!model || !pack) return 0;

    const base = model.basePrice;
    
    // Add cost for extra modules
    const extraModulesCost = (this.config().modules - 1) * 25000;
    
    let subtotal = base + extraModulesCost;

    // Apply pack multiplier and per sqm cost
    subtotal = (subtotal * pack.priceMultiplier) + (this.totalArea() * pack.pricePerSqm);

    // Add extras
    const extrasCost = this.config().extras.reduce((sum, e) => sum + e.price, 0);

    return subtotal + extrasCost;
  });

  // Actions
  setModel(modelId: string) {
    this.config.update(c => ({ ...c, modelId }));
  }

  setModules(modules: number) {
    this.config.update(c => ({ ...c, modules }));
  }

  setDistribution(shape: 'Lineal' | 'L' | 'U') {
    this.config.update(c => ({ ...c, distributionShape: shape }));
  }

  setPack(packId: string) {
    this.config.update(c => ({ ...c, packId }));
  }

  toggleExtra(extra: Extra) {
    this.config.update(c => {
      const exists = c.extras.find(e => e.id === extra.id);
      if (exists) {
        return { ...c, extras: c.extras.filter(e => e.id !== extra.id) };
      } else {
        return { ...c, extras: [...c.extras, extra] };
      }
    });
  }
}
