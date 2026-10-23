import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';

const BRUSH_RADIUS = 143;
const DECAY = 0.016;
const FADE_FRAMES = 120;
const POS_X = 0.64; // object-position — keeps the subject in frame on narrow screens
const POS_Y = 0.5;

/**
 * Before/after "liquid" reveal: `base` is always shown; moving the pointer
 * paints a soft, decaying brush trail of `reveal` over it on a canvas.
 */
@Component({
  selector: 'app-liquid-reveal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'lr' },
  template: `
    <img [src]="base()" [alt]="alt()" fetchpriority="high" />
    <canvas #canvas aria-hidden="true"></canvas>`,
})
export class LiquidRevealComponent {
  readonly base = input.required<string>();
  readonly reveal = input.required<string>();
  readonly alt = input('');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    const canvas = this.canvasRef().nativeElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { canvas.remove(); return; }
    const wrap = this.host.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const cover = document.createElement('canvas');
    const cctx = cover.getContext('2d')!;
    const brush = document.createElement('canvas');
    const bctx = brush.getContext('2d')!;
    const after = new Image();
    let dpr = 1, radius = 0, diam = 0, rect: DOMRect | null = null;
    let points: [number, number][] = [], last: [number, number] | null = null, idle = 999, running = false;

    const measure = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      rect = wrap.getBoundingClientRect();
      canvas.width = cover.width = Math.round(rect.width * dpr);
      canvas.height = cover.height = Math.round(rect.height * dpr);
      radius = BRUSH_RADIUS * dpr;
      diam = Math.ceil(radius * 2);
      brush.width = brush.height = diam;
      if (after.complete && after.naturalWidth) {
        const s = Math.max(cover.width / after.naturalWidth, cover.height / after.naturalHeight);
        const w = after.naturalWidth * s, h = after.naturalHeight * s;
        cctx.drawImage(after, (cover.width - w) * POS_X, (cover.height - h) * POS_Y, w, h);
      }
    };
    after.onload = measure;
    after.src = this.reveal();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);

    const stamp = (x: number, y: number) => {
      const c = diam / 2;
      bctx.globalCompositeOperation = 'source-over';
      bctx.clearRect(0, 0, diam, diam);
      const g = bctx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.55, 'rgba(255,255,255,.82)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      bctx.fillStyle = g;
      bctx.fillRect(0, 0, diam, diam);
      bctx.globalCompositeOperation = 'source-in';
      bctx.drawImage(cover, x - c, y - c, diam, diam, 0, 0, diam, diam);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brush, x - c, y - c);
    };

    const tick = () => {
      const drawing = points.length > 0;
      if (drawing) idle = 0; else idle++;
      if (idle > FADE_FRAMES) { ctx.clearRect(0, 0, canvas.width, canvas.height); running = false; return; }
      const fade = drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (drawing) { for (const [x, y] of points) stamp(x, y); points = []; }
      requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr, y = (e.clientY - rect.top) * dpr;
      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) { last = null; return; }
      if (last) {
        const dx = x - last[0], dy = y - last[1];
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(Math.hypot(dx, dy) / step), 60);
        for (let k = 1; k <= n; k++) points.push([last[0] + (dx * k) / n, last[1] + (dy * k) / n]);
      } else points.push([x, y]);
      last = [x, y];
      if (!running) { running = true; idle = 0; requestAnimationFrame(tick); }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    this.destroyRef.onDestroy(() => { window.removeEventListener('pointermove', onMove); ro.disconnect(); });
  }
}
