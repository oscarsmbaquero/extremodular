import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css']
})
export class PrivacyComponent {
  lastUpdated = '7 de abril de 2025';

  rights = [
    { icon: 'visibility', title: 'Acceso', desc: 'Conocer qué datos personales tratamos sobre usted.' },
    { icon: 'edit', title: 'Rectificación', desc: 'Corregir datos inexactos o incompletos.' },
    { icon: 'delete_forever', title: 'Supresión', desc: 'Solicitar la eliminación de sus datos cuando ya no sean necesarios.' },
    { icon: 'pause_circle', title: 'Limitación', desc: 'Solicitar que restrinjamos el tratamiento en ciertos casos.' },
    { icon: 'sync_alt', title: 'Portabilidad', desc: 'Recibir sus datos en formato estructurado y legible por máquina.' },
    { icon: 'block', title: 'Oposición', desc: 'Oponerse al tratamiento basado en nuestro interés legítimo.' },
  ];

  treatments = [
    {
      purpose: 'Gestión de clientes y proyectos',
      basis: 'Ejecución de contrato',
      retention: 'Duración de la relación + 6 años',
    },
    {
      purpose: 'Envío de comunicaciones comerciales',
      basis: 'Consentimiento',
      retention: 'Hasta retirada del consentimiento',
    },
    {
      purpose: 'Analítica web',
      basis: 'Interés legítimo / Consentimiento',
      retention: '26 meses (Google Analytics)',
    },
    {
      purpose: 'Formularios de contacto',
      basis: 'Consentimiento',
      retention: '12 meses',
    },
    {
      purpose: 'Obligaciones legales y fiscales',
      basis: 'Obligación legal',
      retention: '5–10 años según normativa',
    },
  ];
}