import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { ScrollService } from './core/scroll.service';
import { ClockService } from './core/clock.service';
import { IconSpriteComponent } from './shared/icon-sprite.component';
import { LoaderComponent } from './sections/loader.component';
import { HeaderComponent } from './sections/header.component';
import { HeroComponent } from './sections/hero.component';
import { AboutComponent } from './sections/about.component';
import { CreateBandComponent } from './sections/create-band.component';
import { WorksComponent } from './sections/works.component';
import { ServicesComponent } from './sections/services.component';
import { StatsComponent } from './sections/stats.component';
import { SiteFooterComponent } from './sections/site-footer.component';
import { NavMenuComponent } from './sections/nav-menu.component';
import { RequestModalComponent } from './sections/request-modal.component';

@Component({
  selector: 'app-root',
  imports: [IconSpriteComponent, LoaderComponent, HeaderComponent, HeroComponent, AboutComponent, CreateBandComponent,
    WorksComponent, ServicesComponent, StatsComponent, SiteFooterComponent, NavMenuComponent, RequestModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  private readonly scroll = inject(ScrollService);
  private readonly clock = inject(ClockService);

  constructor() {
    afterNextRender(() => {
      this.scroll.init();
      this.clock.start();
      const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
      const adaptive = () => {
        const widthReduction = ((baseWidth - innerWidth) / baseWidth) * 100;
        const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
        if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
        else document.documentElement.style.removeProperty('font-size');
      };
      adaptive();
      addEventListener('resize', adaptive);
    });
  }
}
