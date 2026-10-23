import { Directive, computed, input } from '@angular/core';
import { LINKS, LinkKey } from '../data/site.data';

/** `<a appLink="github">` — fills href from LINKS and opens external links in a new tab. */
@Directive({
  selector: 'a[appLink]',
  host: { '[attr.href]': 'href()', '[attr.target]': 'external() ? "_blank" : null', '[attr.rel]': 'external() ? "noopener" : null' },
})
export class LinkDirective {
  readonly appLink = input.required<LinkKey>();
  protected readonly href = computed(() => LINKS[this.appLink()]);
  protected readonly external = computed(() => this.appLink() !== 'email');
}
