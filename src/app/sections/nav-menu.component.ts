import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { UiService } from '../core/ui.service';
import { ClockService } from '../core/clock.service';
import { BRAND, NAV } from '../data/site.data';

@Component({
  selector: 'app-nav-menu',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'ui.closeMenu()' },
  template: `
  <div class="nav-ov" [class.open]="ui.menuOpen()" role="dialog" aria-modal="true" aria-label="Menu" [attr.aria-hidden]="!ui.menuOpen()">
    <div class="shell top"><span class="logo"><app-icon name="logo" />{{ brand }}</span><button #close class="close-btn" (click)="ui.closeMenu()"><app-icon name="x" />Close</button></div>
    <nav class="shell" aria-label="Menu"><ul>
      @for (item of nav; track item.label; let i = $index) {
        <li><button [style.--i]="i" (click)="ui.go(item.target)"><small>0{{ i + 1 }}</small><span>{{ item.label }}</span></button></li>
      }
    </ul></nav>
    <div class="shell bot"><span>Cairo time — {{ clock.time() }}</span><button (click)="ui.openModal()">Start a project →</button></div>
  </div>`,
})
export class NavMenuComponent {
  protected readonly ui = inject(UiService);
  protected readonly clock = inject(ClockService);
  protected readonly brand = BRAND;
  protected readonly nav = NAV;
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('close');
  constructor() {
    effect(() => { if (this.ui.menuOpen()) setTimeout(() => this.closeBtn()?.nativeElement.focus(), 50); });
  }
}
