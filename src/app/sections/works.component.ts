import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { PROJECTS } from '../data/site.data';

@Component({
  selector: 'app-works',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section id="works"><div class="shell">
    <span class="eyebrow boxed" appReveal>Portfolio</span>
    <h2 class="h2 lines center" appReveal style="--d:120ms"><span class="sr-only">Selected Work</span><span class="ln" aria-hidden="true"><span>Selected Work</span></span></h2>
    <ul class="cards">
      @for (p of projects; track p.name; let i = $index) {
        <li appReveal [style.--d]="i * 90 + 'ms'">
          <a class="card" [href]="p.url" target="_blank" rel="noopener" [style.--g]="p.glow">
            <div class="glow"></div>
            <div class="meta"><span>{{ p.category }} — {{ p.year }}</span><span class="cbadge"><app-icon name="aur" /></span></div>
            <div class="mark"><span><app-icon name="logo" /><sup>®</sup></span></div>
            <div class="cb">
              <h3>{{ p.name }}</h3>
              <p>{{ p.description }}</p>
              <div class="tags">@for (t of p.tags; track t) { <span>{{ t }}</span> }</div>
            </div>
          </a>
        </li>
      }
    </ul>
  </div></section>`,
})
export class WorksComponent {
  protected readonly projects = PROJECTS;
}
