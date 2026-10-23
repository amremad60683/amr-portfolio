import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { ScrollService } from '../core/scroll.service';
import { UiService } from '../core/ui.service';
import { BRAND } from '../data/site.data';

const FILL_MS = 1300;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Dark intro panel: counts 000 → 100, slides up, then flips `ready`. */
@Component({
  selector: 'app-loader',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  @if (!gone()) {
    <div class="loader" [class.out]="leaving()" role="status" aria-label="Loading" (transitionend)="onEnd($event)">
      <div class="ctr">
        <div class="brand"><app-icon name="logo" />{{ brand }}</div>
        <p>Clean code, shipped with quiet precision.</p>
      </div>
      <div class="prog">
        <div class="track"><div class="fill" [style.width.%]="progress()"></div></div>
        <div class="row"><span>Loading</span><b class="tnum">{{ label() }}</b></div>
      </div>
    </div>
  }`,
})
export class LoaderComponent {
  protected readonly brand = BRAND;
  private readonly scroll = inject(ScrollService);
  private readonly ui = inject(UiService);
  private readonly host = inject(ElementRef);
  protected readonly progress = signal(0);
  protected readonly leaving = signal(false);
  protected readonly gone = signal(false);
  protected label = () => String(this.progress()).padStart(3, '0');

  constructor() {
    afterNextRender(() => {
      this.scroll.stop();
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / FILL_MS);
        this.progress.set(Math.round(easeInOutCubic(t) * 100));
        if (t < 1) { requestAnimationFrame(step); return; }
        this.leaving.set(true);
        setTimeout(() => this.finish(), 1500); // backstop if transitionend never fires
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) this.finish();
      };
      requestAnimationFrame(step);
    });
  }

  protected onEnd(e: TransitionEvent): void {
    if (e.target === e.currentTarget && e.propertyName === 'transform') this.finish();
  }

  private finish(): void {
    if (this.gone()) return;
    this.gone.set(true);
    this.ui.ready.set(true);
    this.scroll.start();
  }
}
