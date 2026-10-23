import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { LiquidRevealComponent } from './liquid-reveal.component';
import { UiService } from '../core/ui.service';
import { BRAND, CARD_ITEMS, HERO_IMAGES, HERO_LINES, STACK, WATERMARK } from '../data/site.data';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, RevealDirective, LiquidRevealComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section id="home">
    <app-liquid-reveal [base]="images.base" [reveal]="images.reveal" [alt]="brand + ' — portrait'" />
    <div class="vig"></div>
    <div class="wm" appReveal="hero" style="--d:300ms" aria-hidden="true">{{ watermark }}</div>

    <div class="shell hgrid">
      <div class="hleft">
        <div><span class="eyebrow" appReveal="hero" style="--d:200ms;--ty:10px">Full Stack Developer · Cairo</span></div>
        <h1 class="h1 lines" appReveal="hero" style="--d:250ms;--ls:120ms">
          <span class="sr-only">{{ lines.join(' ') }}</span>
          @for (line of lines; track $index) {
            <span class="ln" aria-hidden="true" [style.--i]="$index"><span>{{ line }}</span></span>
          }
        </h1>
        <div class="rating" appReveal="hero" style="--d:650ms">
          <span class="stars">@for (s of [1,2,3,4,5]; track s) { <app-icon name="star" /> }</span>
          <span>10+ projects shipped</span>
        </div>
        <div class="ctas" appReveal="hero" style="--d:750ms">
          <button class="pill-root" (click)="ui.openModal()"><span class="pill dark arr">Let's Talk<span class="badge"><app-icon name="ar" extra="arrow-r" /></span></span></button>
          <button class="pill-root" (click)="ui.go('works')"><span class="pill outline-w noarr">View Work</span></button>
        </div>
      </div>

      <div class="hright-col">
        <div class="hcard" appReveal="hero" style="--d:400ms">
          <div class="rowc" role="button" tabindex="0" aria-label="Next highlight" (click)="step(1)" (keydown.enter)="step(1)" (keydown.space)="step(1); $event.preventDefault()">
            <div class="tile"><app-icon name="logo" /></div>
            <div class="panel">
              <div class="slot">
                @for (item of items; track item.caption; let i = $index) {
                  <div class="item" [style.opacity]="i === index() ? 1 : 0"
                       [style.transform]="i === index() ? 'none' : 'translateY(' + (i === prev() ? -14 * dir() : 14 * dir()) + 'px)'">
                    <div class="cap">{{ item.caption }}</div><div class="ttl">{{ item.title }}</div>
                  </div>
                }
              </div>
              <div class="bot">
                <div class="dots">@for (item of items; track item.caption; let i = $index) { <i [class.on]="i === index()"></i> }</div>
                <div class="navs">
                  <button aria-label="Previous" (click)="step(-1); $event.stopPropagation()"><app-icon name="ar" extra="flip" /></button>
                  <button aria-label="Next" (click)="step(1); $event.stopPropagation()"><app-icon name="ar" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="partners" appReveal="hero" style="--d:550ms">
          <p>Stack I ship with</p>
          <ul>@for (s of stack; track s) { <li><span><app-icon name="cdot" />{{ s }}</span></li> }</ul>
        </div>
      </div>
    </div>

    <div class="shell"><div class="status" appReveal="hero" style="--d:900ms">
      <span>Building since 2019</span><span class="mid">Cairo, Egypt — remote friendly</span><span class="scroll">Scroll to explore <span aria-hidden="true">↓</span></span>
    </div></div>
  </section>`,
})
export class HeroComponent {
  protected readonly ui = inject(UiService);
  protected readonly images = HERO_IMAGES;
  protected readonly brand = BRAND;
  protected readonly watermark = WATERMARK;
  protected readonly lines = HERO_LINES;
  protected readonly items = CARD_ITEMS;
  protected readonly stack = STACK;
  protected readonly index = signal(0);
  protected readonly prev = signal(-1);
  protected readonly dir = signal(1);

  protected step(by: number): void {
    const n = this.items.length;
    this.prev.set(this.index());
    this.dir.set(by);
    this.index.set((this.index() + by + n) % n);
  }
}
