/**
 * Scroll + pointer motion enhancements: Lenis smooth scroll, parallax
 * drift, magnetic buttons. Pure enhancement — safe to skip entirely.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  smoothScroll();
  parallax();
  magnetic();
}

function smoothScroll() {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = (a as HTMLAnchorElement).getAttribute('href') || '';
      const id = href.split('#')[1];
      const target = id && document.getElementById(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      }
    });
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.2');
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

function magnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.4');
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: mx * strength, y: my * strength, duration: 0.6, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
