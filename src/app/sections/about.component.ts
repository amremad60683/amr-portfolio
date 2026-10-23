import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { LinkDirective } from '../shared/link.directive';
import { ABOUT } from '../data/site.data';

@Component({
  selector: 'app-about',
  imports: [IconComponent, RevealDirective, LinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section id="about"><div class="shell">
    <div class="globe-block">
      <app-icon name="globe" extra="globe-bg" />
      <span class="eyebrow">About me</span>
      <div class="gnote" appReveal style="--ty:12px"><app-icon name="globe" /><span>Based in Cairo, building for teams anywhere.</span></div>
    </div>
    <div class="statement">
      <h2 class="words" appReveal [attr.aria-label]="about.lead + ' ' + about.muted">
        @for (w of lead; track $index) { <span class="wd" aria-hidden="true" [style.--w]="$index">{{ w }}</span>{{ ' ' }} }
        <span class="mut">@for (w of muted; track $index) { <span class="wd" aria-hidden="true" [style.--w]="lead.length + $index">{{ w }}</span>{{ ' ' }} }</span>
      </h2>
      <div class="sfoot" appReveal style="--ty:12px;--d:200ms">
        <div>
          <p class="lb">Find me online</p>
          <div class="socials">
            <a class="acc" appLink="linkedin" aria-label="LinkedIn"><app-icon name="in" /></a>
            <a appLink="github" aria-label="GitHub"><app-icon name="gh" /></a>
            <a appLink="whatsapp" aria-label="WhatsApp"><app-icon name="wa" /></a>
            <a appLink="email" aria-label="Email"><app-icon name="mail" /></a>
          </div>
        </div>
        <a class="pill-root" appLink="github"><span class="pill outline arr">My GitHub<span class="badge"><app-icon name="aur" extra="arrow-ur" /></span></span></a>
      </div>
    </div>
  </div></section>`,
})
export class AboutComponent {
  protected readonly about = ABOUT;
  protected readonly lead = ABOUT.lead.split(' ');
  protected readonly muted = ABOUT.muted.split(' ');
}
