import { Directive, ElementRef, OnDestroy, afterNextRender, effect, inject, input } from '@angular/core';
import { UiService } from '../core/ui.service';

/**
 * Plays an entrance once, when the element scrolls into view, by adding `.in`.
 * `appReveal="hero"` also waits for the intro loader to leave.
 * Styling lives in styles/_reveal.scss: `[appReveal]` (fade/rise), `.lines` (line clip), `.words` (word stagger).
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnDestroy {
  readonly appReveal = input<'' | 'hero'>('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ui = inject(UiService);
  private io?: IntersectionObserver;
  private visible = false;

  constructor() {
    afterNextRender(() => {
      this.io = new IntersectionObserver((entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
        this.tryPlay();
      }, { rootMargin: '0px 0px -8% 0px' });
      this.io.observe(this.el.nativeElement);
    });
    effect(() => { this.ui.ready(); this.tryPlay(); });
  }

  private tryPlay(): void {
    if (!this.visible) return;
    if (this.appReveal() === 'hero' && !this.ui.ready()) return;
    this.el.nativeElement.classList.add('in');
    this.io?.disconnect();
  }

  ngOnDestroy(): void { this.io?.disconnect(); }
}
