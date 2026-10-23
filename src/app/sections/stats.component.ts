import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal, viewChildren } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { ScrollService } from '../core/scroll.service';
import { STATS } from '../data/site.data';

/** Numbers count up with scroll: 0 when a figure's top meets the viewport bottom, full at its centre meeting the viewport centre. */
@Component({
  selector: 'app-stats',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section id="stats"><div class="shell">
    <div class="spanel" appReveal>
      <span class="eyebrow light">By the numbers</span>
      <h2 class="lines" appReveal style="--d:120ms"><span class="sr-only">Proof in the work, not the words.</span><span class="ln" aria-hidden="true"><span>Proof in the work, not the words.</span></span></h2>
      <ul class="sgrid">
        @for (s of stats; track s.label; let i = $index) {
          <li appReveal [style.--d]="i * 90 + 'ms'">
            <div class="num tnum"><span #num>{{ shown()[i] }}</span>{{ s.suffix }}</div>
            <div class="lab">{{ s.label }}</div>
          </li>
        }
      </ul>
    </div>
  </div></section>`,
})
export class StatsComponent {
  protected readonly stats = STATS;
  protected readonly shown = signal(STATS.map(() => 0));
  private readonly nums = viewChildren<ElementRef<HTMLElement>>('num');
  private readonly scroll = inject(ScrollService);
  private last = 0;

  constructor() {
    afterNextRender(() => {
      const update = () => {
        const now = performance.now();
        if (now - this.last < 30) return;
        this.last = now;
        const vh = innerHeight;
        this.shown.set(this.nums().map((ref, i) => {
          const r = ref.nativeElement.getBoundingClientRect();
          const start = r.top - vh, end = r.top + r.height / 2 - vh / 2;
          const len = Math.abs(start - end) || 1;
          const p = Math.min(1, Math.max(0, 1 - (start + len) / len));
          return Math.round(p * this.stats[i].value);
        }));
      };
      this.scroll.onScroll(update);
      update();
    });
  }
}
