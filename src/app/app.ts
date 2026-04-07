import { ChangeDetectionStrategy, Component, signal, HostListener  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, ChatbotComponent, Header, Footer],
  templateUrl: './app.html',
})
export class App {
   showScrollTop = signal(false);

    @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop.set(window.scrollY > 400);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // toggleMenu() {
  //   this.menuOpen.update(v => !v);
  // }

  // closeMenu() {
  //   this.menuOpen.set(false);
  // }
}
