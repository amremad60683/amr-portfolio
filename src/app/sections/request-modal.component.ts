import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { IconComponent } from '../shared/icon.component';
import { UiService } from '../core/ui.service';
import { EMAIL } from '../data/site.data';

/** Contact form. Sending opens the visitor's email app with the message filled in, addressed to you. */
@Component({
  selector: 'app-request-modal',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
  template: `
  <div class="modal" [class.open]="ui.modalOpen()" [class.closing]="closing()" role="dialog" aria-modal="true" aria-label="Start a project" (click)="close()">
    <div class="mpanel" [class.done]="done()" (click)="$event.stopPropagation()">
      <button class="mclose" aria-label="Close" (click)="close()"><app-icon name="x" /></button>
      <div class="mformwrap">
        <div class="mhead"><span class="k">Start a project</span><h2>Tell me what you're building.</h2></div>
        <form #form class="mform" (submit)="send($event)">
          <label><span>Name</span><input #first name="name" type="text" required placeholder="Your name"></label>
          <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com"></label>
          <label><span>Project</span><textarea name="project" rows="4" required placeholder="A few words about your project, timeline, and budget."></textarea></label>
          <div class="mrow"><span>I reply within one business day.</span>
            <button class="pill-root" type="submit"><span class="pill dark arr">{{ sending() ? 'Sending…' : 'Send request' }}<span class="badge"><app-icon name="aur" extra="arrow-ur" /></span></span></button>
          </div>
        </form>
      </div>
      <div class="msucc">
        <div class="ok"><app-icon name="logo" /></div>
        <h2>Almost there</h2>
        <p>Your email app just opened with the message ready — hit send and I'll get back to you within one business day.</p>
        <button class="pill-root" (click)="close()"><span class="pill dark noarr">Close</span></button>
      </div>
    </div>
  </div>`,
})
export class RequestModalComponent {
  protected readonly ui = inject(UiService);
  protected readonly sending = signal(false);
  protected readonly done = signal(false);
  protected readonly closing = signal(false);
  private readonly form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  private readonly first = viewChild.required<ElementRef<HTMLInputElement>>('first');

  constructor() {
    effect(() => { if (this.ui.modalOpen()) setTimeout(() => this.first().nativeElement.focus(), 300); });
  }

  protected close(): void {
    if (!this.ui.modalOpen()) return;
    this.closing.set(true);
    this.ui.closeModal();
    setTimeout(() => {
      this.form().nativeElement.reset();
      this.done.set(false);
      this.sending.set(false);
      this.closing.set(false);
    }, 300);
  }

  protected send(e: Event): void {
    e.preventDefault();
    const d = new FormData(this.form().nativeElement);
    this.sending.set(true);
    const subject = encodeURIComponent(`New project from ${d.get('name')}`);
    const body = encodeURIComponent(`${d.get('project')}\n\n— ${d.get('name')} (${d.get('email')})`);
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      this.done.set(true);
    }, 500);
  }
}
