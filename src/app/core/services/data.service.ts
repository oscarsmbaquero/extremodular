import { Injectable, signal } from '@angular/core';
import { HouseModel, Pack, Extra, Budget, Project } from '../models/house-model';

@Injectable({ providedIn: 'root' })
export class DataService {
  // Mock Data
  models = signal<HouseModel[]>([
    {
      id: 'm1',
      name: 'VERA',
      area: 60,
      distribution: '2 Habitaciones, 1 Baño',
      basePrice: 55000,
      images: ['modelo_vera.png'],
      description: 'Modelo compacto y eficiente, ideal para parejas o segundas residencias.'
    },
    {
      id: 'm2',
      name: 'AMBROZ',
      area: 90,
      distribution: '3 Habitaciones, 2 Baños',
      basePrice: 85000,
      images: ['modelo_ambroz.jpg'],
      description: 'Amplitud y confort para toda la familia con un diseño moderno.'
    },
    {
      id: 'm3',
      name: 'JERTE',
      area: 120,
      distribution: '4 Habitaciones, 2 Baños, Despacho',
      basePrice: 115000,
      images: ['modelo_jerte.png'],
      description: 'Nuestra joya de la corona. Espacio sin límites y acabados premium.'
    },
    {
      id: 'm4',
      name: 'PROYECTO PERSONALIZADO',
      area: 0,
      distribution: 'A medida',
      basePrice: 0,
      images: ['https://placehold.co/800x600/0a0a0a/ffffff?text=PROYECTO+PERSONALIZADO'],
      description: 'Diseñamos tu casa desde cero según tus necesidades específicas.'
    }
  ]);

  packs = signal<Pack[]>([
    { id: 'p1', name: 'Essential', description: 'Acabados estándar de alta calidad.', priceMultiplier: 1, pricePerSqm: 0 },
    { id: 'p2', name: 'Plus', description: 'Mejoras en aislamiento y domótica básica.', priceMultiplier: 1.1, pricePerSqm: 150 },
    { id: 'p3', name: 'Premium', description: 'Materiales de lujo, domótica avanzada y autosuficiencia.', priceMultiplier: 1.25, pricePerSqm: 300 }
  ]);

  extras = signal<Extra[]>([
    { id: 'e1', name: 'Piscina prefabricada', price: 12000 },
    { id: 'e2', name: 'Porche extendido', price: 4500 },
    { id: 'e3', name: 'Paneles solares extra', price: 6000 }
  ]);

  budgets = signal<Budget[]>([]);
  projects = signal<Project[]>([
    {
      id: 'prj1',
      budgetId: 'b1',
      clientName: 'Juan Pérez',
      status: 'Fabricación',
      progress: 45,
      startDate: '2026-01-15',
      estimatedDelivery: '2026-05-20'
    }
  ]);

  addBudget(budget: Budget) {
    this.budgets.update(b => [...b, budget]);
  }
}
