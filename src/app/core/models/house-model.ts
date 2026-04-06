export interface HouseModel {
  id: string;
  name: string;
  area: number; // sqm
  distribution: string;
  basePrice: number;
  images: string[];
  description: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number; // e.g., 1.0 for Essential, 1.15 for Plus, 1.3 for Premium
  pricePerSqm: number;
}

export interface Configuration {
  modelId: string | null;
  modules: number;
  distributionShape: 'Lineal' | 'L' | 'U';
  packId: string | null;
  extras: Extra[];
}

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface Budget {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  configuration: Configuration;
  totalPrice: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Project {
  id: string;
  budgetId: string;
  clientName: string;
  status: 'Estudio Inicial' | 'Fabricación' | 'Transporte' | 'Montaje' | 'Entregado';
  progress: number; // 0-100
  startDate: string;
  estimatedDelivery: string;
}
