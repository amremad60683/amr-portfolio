import { Injectable, inject, DOCUMENT } from '@angular/core';
import Lenis from 'lenis';

/** Lenis smooth scroll plus a reference-counted scroll lock (loader, menu, modal). */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly doc = inject(DOCUMENT);
  private lenis: Lenis | null = null;
  private locks = 0;

  init(): void {
    if (this.lenis) return;
    window.scrollTo(0, 0);
    history.scrollRestoration = 'manual';
    this.lenis = new Lenis({ smoothWheel: true });
    const raf = (t: number) => { this.lenis?.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  onScroll(cb: () => void): void {
    this.lenis?.on('scroll', cb);
    window.addEventListener('scroll', cb, { passive: true });
  }

  stop(): void {
    this.locks++;
    this.lenis?.stop();
    Object.assign(this.doc.documentElement.style, { position: 'relative', overflow: 'hidden', height: '100%' });
  }

  start(): void {
    this.locks = Math.max(0, this.locks - 1);
    if (this.locks) return;
    this.lenis?.start();
    for (const p of ['position', 'overflow', 'height']) this.doc.documentElement.style.removeProperty(p);
  }

  scrollTo(id: string): void {
    const el = this.doc.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      if (this.lenis) this.lenis.scrollTo(el, { duration: 1.2 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
    }, 50);
  }
}
