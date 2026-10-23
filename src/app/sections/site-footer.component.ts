import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { LinkDirective } from '../shared/link.directive';
import { UiService } from '../core/ui.service';
import { BRAND, PROJECTS, WATERMARK } from '../data/site.data';

@Component({
  selector: 'app-site-footer',
  imports: [IconComponent, RevealDirective, LinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <footer>
    <div class="shell">
      <div class="fcta">
        <h2 class="lines" appReveal style="--ls:100ms">
          <span class="sr-only">Have a project in mind? Let's build it.</span>
          <span class="ln" aria-hidden="true" style="--i:0"><span>Have a project in mind?</span></span>
          <span class="ln" aria-hidden="true" style="--i:1"><span>Let's build it.</span></span>
        </h2>
        <div><button class="pill-root" (click)="ui.openModal()"><span class="pill light arr">Start a project<span class="badge"><app-icon name="aur" extra="arrow-ur" /></span></span></button></div>
      </div>
      <div class="fcols">
        <div class="fbrand"><div class="logo"><app-icon name="logo" />{{ brand }}</div><p>Full stack developer and system administrator — Angular on the front, .NET and SQL Server behind it.</p></div>
        <div class="fcol"><h4>Explore</h4><ul>
          @for (l of explore; track l[0]) { <li><button class="alink" (click)="ui.go(l[1])"><span>{{ l[0] }}</span></button></li> }
        </ul></div>
        <div class="fcol"><h4>Projects</h4><ul>
          @for (p of projects; track p.name) { <li><a class="alink" [href]="p.url" target="_blank" rel="noopener"><span>{{ p.name }}</span></a></li> }
        </ul></div>
        <div class="fcol"><h4>Social</h4><ul>
          <li><a class="alink" appLink="linkedin"><span>LinkedIn</span></a></li>
          <li><a class="alink" appLink="github"><span>GitHub</span></a></li>
          <li><a class="alink" appLink="whatsapp"><span>WhatsApp</span></a></li>
          <li><a class="alink" appLink="email"><span>Email</span></a></li>
        </ul></div>
      </div>
      <div class="legal">
        <span>© {{ year }} {{ brand }}. All rights reserved.</span>
        <div><a class="alink" appLink="email"><span>Email me</span></a><button class="alink" (click)="ui.go('home')"><span>Back to top</span></button></div>
      </div>
    </div>
    <div class="fwm" aria-hidden="true">{{ watermark }}</div>
  </footer>`,
})
export class SiteFooterComponent {
  protected readonly ui = inject(UiService);
  protected readonly brand = BRAND;
  protected readonly watermark = WATERMARK;
  protected readonly projects = PROJECTS;
  protected readonly year = new Date().getFullYear();
  protected readonly explore: [string, string][] = [['Home', 'home'], ['Work', 'works'], ['Skills', 'services'], ['About', 'about']];
}
