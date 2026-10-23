import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'logo' | 'ar' | 'aur' | 'star' | 'globe' | 'x' | 'cdot' | 'menu' | 'gh' | 'in' | 'wa' | 'mail';

/** One icon from the sprite in <app-icon-sprite>, sized 1em, coloured by currentColor. */
@Component({
  selector: 'app-icon',
  template: `<svg class="i" [class]="extra()" aria-hidden="true"><use [attr.href]="'#' + name()" /></svg>`,
  host: { style: 'display:contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly extra = input('');
}
