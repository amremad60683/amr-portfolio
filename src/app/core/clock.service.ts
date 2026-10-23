import { Injectable, signal } from '@angular/core';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Live Cairo time, ticking every second. */
@Injectable({ providedIn: 'root' })
export class ClockService {
  readonly time = signal('9:41am');
  readonly date = signal('12 March, 2025');
  private started = false;

  start(): void {
    if (this.started) return;
    this.started = true;
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'numeric', year: 'numeric', hourCycle: 'h23' });
    const tick = () => {
      const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]));
      const h = Number(p['hour']);
      this.time.set(`${h % 12 || 12}:${p['minute']}${h < 12 ? 'am' : 'pm'}`);
      this.date.set(`${Number(p['day'])} ${MONTHS[Number(p['month']) - 1]}, ${p['year']}`);
    };
    tick();
    setInterval(tick, 1000);
  }
}
