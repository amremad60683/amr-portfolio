import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-create-band',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section aria-label="I build better">
    <ul class="shell band">
      <li appReveal style="--d:0ms"><div class="tl light">I</div></li>
      <li appReveal style="--d:120ms"><div class="tl accent">Build</div></li>
      <li appReveal style="--d:240ms"><div class="tl dark"><app-icon name="ar" /></div></li>
      <li appReveal style="--d:360ms"><div class="tl ghost">Better</div></li>
    </ul>
  </section>`,
})
export class CreateBandComponent {}
