/** Everything you'd want to edit lives here: links, copy, projects, skills, numbers. */

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/amr-el-hariry-209770445',
  github: 'https://github.com/amremad60683',
  whatsapp: 'https://wa.me/201010320861',
  email: 'mailto:amre38606@gmail.com',
} as const;
export type LinkKey = keyof typeof LINKS;

export const EMAIL = 'amre38606@gmail.com';
export const BRAND = 'Amr El Hariri';
export const WATERMARK = 'HARIRI';

export const HERO_IMAGES = {
  /** Always shown. */
  base: 'images/hero-base.jpg',
  /** Painted along the cursor trail. */
  reveal: 'images/hero-reveal.jpg',
};

export const HERO_LINES = ['Clean code,', 'shipped with', 'quiet precision'];

export const CARD_ITEMS = [
  { caption: 'Frontend', title: 'Angular, to the pixel.' },
  { caption: 'Backend', title: '.NET, built to scale.' },
  { caption: 'Systems', title: 'Servers that stay up.' },
];

export const STACK = ['Angular', 'TypeScript', 'RxJS', '.NET', 'C#', 'SQL Server', 'Git'];

export const ABOUT = {
  lead: 'I build web apps with Angular and .NET, then keep them running —',
  muted: 'clean architecture, fast interfaces, and the servers and databases underneath them.',
};

export interface Project {
  name: string; category: string; year: string; description: string; tags: string[]; url: string; glow: string;
}
export const PROJECTS: Project[] = [
  { name: 'Trendify', category: 'E-commerce', year: 'Live', description: 'A modern fashion store UI — mobile-first, responsive, with browsable product categories.', tags: ['E-commerce', 'Responsive', 'UI'], url: 'https://trendify-ten.vercel.app/home', glow: 'rgba(177,95,44,.4)' },
  { name: 'Mealify', category: 'Landing page', year: 'Live', description: 'A restaurant landing page with hero calls-to-action, chefs, a gallery and a contact section.', tags: ['Landing Page', 'Layout', 'GitHub Pages'], url: 'https://amremad60683.github.io/Mealify/', glow: 'rgba(207,128,71,.35)' },
  { name: 'Weather', category: 'Web app', year: 'Live', description: 'Search any city for current conditions and a multi-day forecast, pulled from a live API.', tags: ['API', 'Forecast', 'JavaScript'], url: 'https://amremad60683.github.io/Weather/', glow: 'rgba(80,120,160,.35)' },
  { name: 'Game Over', category: 'Auth UI', year: 'Live', description: 'A login interface with required-field validation and a classic, clean form style.', tags: ['Forms', 'Validation', 'GitHub Pages'], url: 'https://amremad60683.github.io/Game-Over/', glow: 'rgba(151,80,31,.4)' },
];

export const SERVICES = [
  { title: 'Frontend Development', description: 'Angular, TypeScript and RxJS — fast, accessible interfaces.' },
  { title: 'Backend & APIs', description: '.NET Core, C# and Web API — clean, scalable services.' },
  { title: 'Databases', description: 'SQL Server design, queries and day-to-day administration.' },
  { title: 'IT & Systems', description: 'Servers, users and infrastructure that stay up and secure.' },
];

export const STATS = [
  { value: 10, suffix: '+', label: 'Projects shipped' },
  { value: 3, suffix: '', label: 'Route diplomas' },
  { value: 6, suffix: '+', label: 'Core technologies' },
  { value: 2019, suffix: '', label: 'Building since' },
];

/** `target: null` opens the contact modal. */
export const NAV: { label: string; target: string | null }[] = [
  { label: 'Home', target: 'home' },
  { label: 'Work', target: 'works' },
  { label: 'Skills', target: 'services' },
  { label: 'About', target: 'about' },
  { label: 'Numbers', target: 'stats' },
  { label: 'Contact', target: null },
];
