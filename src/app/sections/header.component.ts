import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { UiService } from '../core/ui.service';
import { ClockService } from '../core/clock.service';
import { BRAND, NAV } from '../data/site.data';

@Component({
  selector: 'app-header',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'header', '[class.shown]': 'ui.ready()' },
  template: `
  <div class="shell">
    <button class="logo-btn" (click)="ui.go('home')" [attr.aria-label]="brand + ' — home'"><span class="logo"><app-icon name="logo" />{{ brand }}</span></button>
    <nav class="pnav" aria-label="Primary">
      <ul>
        @for (item of nav; track item.label; let first = $first) {
          <li><button (click)="ui.go(item.target)" [attr.aria-current]="first ? 'page' : null">
            <span>{{ item.label }}@if (item.label === 'Skills') { <i class="caret">▾</i> }</span>
          </button></li>
        }
      </ul>
    </nav>
    <div class="hright">
      <div class="chip"><span class="lbl">Cairo time</span><span class="t tnum">{{ clock.time() }}</span><span class="sep">•</span><span class="dt">{{ clock.date() }}</span></div>
      <button class="menu-btn" (click)="ui.openMenu()" aria-haspopup="dialog"><span><app-icon name="menu" /><span class="menu-word">Menu</span></span></button>
    </div>
  </div>`,
})
export class HeaderComponent {
  protected readonly ui = inject(UiService);
  protected readonly clock = inject(ClockService);
  protected readonly brand = BRAND;
  protected readonly nav = NAV;
}
