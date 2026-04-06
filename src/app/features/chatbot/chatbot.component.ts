import { Component, ChangeDetectionStrategy, signal, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { GoogleGenAI, Chat } from '@google/genai';
import { DataService } from '../../core/services/data.service';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements AfterViewChecked {
  dataService = inject(DataService);
  
  isOpen = signal(false);
  messages = signal<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Extremodular. Estoy aquí para resolver cualquier duda que tengas sobre nuestros modelos de viviendas (VERA, AMBROZ y JERTE). ¿En qué te puedo ayudar hoy?' }
  ]);
  userInput = signal('');
  isLoading = signal(false);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen() && !this.chatSession) {
      this.initChat();
    }
  }

  private initChat() {
    const modelsInfo = this.dataService.models().map(m => 
      `- ${m.name}: ${m.area}m2, ${m.distribution}. Precio desde ${m.basePrice}€. Descripción: ${m.description}`
    ).join('\n');

    const systemInstruction = `Eres un asistente virtual experto y amable para la empresa de viviendas modulares "Extremodular".
Tu único propósito es responder preguntas sobre los modelos de viviendas de la empresa.
Si el usuario pregunta sobre cualquier otro tema que no esté relacionado con los modelos de casas, la empresa, o la configuración de las mismas, debes declinar amablemente responder y redirigir la conversación hacia los modelos de viviendas.

Información de los modelos disponibles:
${modelsInfo}

Packs de acabados disponibles:
${this.dataService.packs().map(p => `- ${p.name}: ${p.description}`).join('\n')}

Extras disponibles:
${this.dataService.extras().map(e => `- ${e.name} (+${e.price}€)`).join('\n')}

Reglas:
1. Sé conciso, claro y profesional.
2. No inventes información. Si no sabes algo, di que no tienes esa información y que un asesor humano puede ayudarle.
3. Utiliza un tono entusiasta sobre las ventajas de la construcción modular (rapidez, eficiencia, diseño).
4. NUNCA respondas a preguntas fuera del ámbito de las viviendas modulares de Extremodular.`;

    this.chatSession = this.ai.chats.create({
      model: 'gemini-3.1-pro-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3
      }
    });
  }

  async sendMessage() {
    const text = this.userInput().trim();
    if (!text || this.isLoading()) return;

    // Add user message to UI
    this.messages.update(m => [...m, { role: 'user', text }]);
    this.userInput.set('');
    this.isLoading.set(true);

    if (!this.chatSession) {
      this.initChat();
    }

    if (!this.chatSession) return;

    try {
      const response = await this.chatSession.sendMessage({ message: text });
      this.messages.update(m => [...m, { role: 'model', text: response.text || '' }]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      this.messages.update(m => [...m, { role: 'model', text: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.' }]);
    } finally {
      this.isLoading.set(false);
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch {
      // ignore
    }
  }
}
