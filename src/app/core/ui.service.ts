import { Injectable, inject, signal } from '@angular/core';
import { ScrollService } from './scroll.service';

/** App-wide UI state: the intro has finished, the menu and the contact modal. */
@Injectable({ providedIn: 'root' })
export class UiService {
  private readonly scroll = inject(ScrollService);
  readonly ready = signal(false);
  readonly menuOpen = signal(false);
  readonly modalOpen = signal(false);

  openMenu(): void { if (this.menuOpen()) return; this.menuOpen.set(true); this.scroll.stop(); }
  closeMenu(): void { if (!this.menuOpen()) return; this.menuOpen.set(false); this.scroll.start(); }
  openModal(): void { if (this.modalOpen()) return; this.closeMenu(); this.modalOpen.set(true); this.scroll.stop(); }
  closeModal(): void { if (!this.modalOpen()) return; this.modalOpen.set(false); this.scroll.start(); }

  /** Navigate to a section id, or open the contact modal for `null`. */
  go(target: string | null): void {
    this.closeMenu();
    if (target === null) this.openModal();
    else this.scroll.scrollTo(target);
  }
}
