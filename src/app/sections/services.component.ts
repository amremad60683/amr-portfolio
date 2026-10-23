import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { UiService } from '../core/ui.service';
import { SERVICES } from '../data/site.data';

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section id="services"><div class="shell">
    <span class="eyebrow" appReveal>Skills</span>
    <h2 class="h2 lines" appReveal style="--d:120ms"><span class="sr-only">What I do best</span><span class="ln" aria-hidden="true"><span>What I do best</span></span></h2>
    <ul>
      @for (s of services; track s.title; let i = $index) {
        <li class="srow-li" appReveal [style.--d]="i * 80 + 'ms'">
          <button class="srow" (click)="ui.openModal()">
            <span class="idx">0{{ i + 1 }}</span><h3>{{ s.title }}</h3><p>{{ s.description }}</p><span class="sbadge"><app-icon name="aur" /></span>
          </button>
        </li>
      }
    </ul>
  </div></section>`,
})
export class ServicesComponent {
  protected readonly ui = inject(UiService);
  protected readonly services = SERVICES;
}
