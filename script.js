const filters = document.querySelectorAll('.filter');
const projectGrid = document.querySelector('#project-grid');
let projects = [];

function safeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function videoEmbed(value) {
  try {
    const url = new URL(value);
    if (url.hostname === 'drive.google.com') {
      const match = url.pathname.match(/\/file\/d\/([^/]+)/);
      if (match) return `https://drive.google.com/file/d/${encodeURIComponent(match[1])}/preview`;
    }
    if (url.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(url.pathname.slice(1))}?autoplay=1&rel=0`;
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
      const id = url.searchParams.get('v');
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0` : '';
    }
    if (['vimeo.com', 'www.vimeo.com'].includes(url.hostname)) {
      const id = url.pathname.split('/').filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}?autoplay=1` : '';
    }
  } catch {}
  return '';
}

function renderProjects(items) {
  projectGrid.replaceChildren(...items.map((project, index) => {
    const article = document.createElement('article');
    article.className = 'project';
    article.dataset.category = project.category;
    article.dataset.video = project.video || '';
    article.dataset.title = project.title;
    article.dataset.videoEmbed = videoEmbed(project.video || '');

    const link = document.createElement('a');
    link.className = 'project-image';
    link.href = safeUrl(project.video || project.image) || '#work';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${project.video ? 'Watch' : 'View'} ${project.title}`);
    const imageUrl = safeUrl(project.cover || project.image);
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = project.coverAlt || `${project.title} portfolio image`;
      image.loading = index < 2 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.onerror = () => image.remove();
      link.append(image);
    }
    if (project.video) {
      const play = document.createElement('span');
      play.className = 'play';
      play.textContent = '▶';
      link.append(play);
    }
    if (project.video && new URL(project.video).hostname === 'drive.google.com') {
      const badge = document.createElement('span');
      badge.className = 'project-media-label';
      badge.textContent = 'PLAY FILM';
      link.append(badge);
    }
    const number = document.createElement('span');
    number.className = 'project-number';
    number.textContent = String(index + 1).padStart(2, '0');
    link.append(number);

    const info = document.createElement('div');
    info.className = 'project-info';
    const copy = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = project.title;
    const meta = document.createElement('p');
    meta.textContent = [project.type, project.year, project.client].filter(Boolean).join(' · ');
    copy.append(title, meta);
    const arrow = document.createElement('span');
    arrow.className = 'project-arrow';
    arrow.textContent = '↗';
    info.append(copy, arrow);
    article.append(link, info);
    return article;
  }));
  projects = [...projectGrid.querySelectorAll('.project')];
  const note = document.querySelector('#portfolio-note');
  note.hidden = items.length > 0;
  document.querySelector('.work-count').textContent = `01 — ${String(items.length).padStart(2, '0')}`;
  filters.forEach((button) => {
    const count = button.dataset.filter === 'all' ? items.length : items.filter((item) => item.category === button.dataset.filter).length;
    button.querySelector('span').textContent = String(count).padStart(2, '0');
  });
}

function openVideo(project) {
  const src = videoEmbed(project.video);
  if (!src) return false;
  const frame = document.createElement('iframe');
  frame.className = 'video-frame';
  frame.src = src;
  frame.title = `${project.title} video`;
  frame.allow = 'autoplay; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  const dialog = document.createElement('dialog');
  dialog.className = 'video-dialog';
  const close = document.createElement('button');
  close.className = 'video-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close video');
  close.textContent = '×';
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialog.remove());
  dialog.append(close, frame);
  document.body.append(dialog);
  dialog.showModal();
  return true;
}

function categoryLabel(key) {
  return ({ product: 'Product', event: 'Event', portrait: 'Portrait', film: 'Film', campaign: 'Campaign', photography: 'Photography' })[key] || key;
}

async function loadPortfolio() {
  const categories = [...filters].map((button) => button.dataset.filter).filter((key) => key !== 'all');
  const groups = await Promise.all(categories.map(async (category) => {
    const response = await fetch(`assets/portfolio/${category}/index.txt`);
    if (!response.ok) return [];
    const filenames = (await response.text()).split(/\r?\n/).filter((name) => /\.(jpe?g|png|webp|avif|gif|mp4|webm)$/i.test(name));
    return filenames.map((name) => {
        const filename = name.trim();
        const url = new URL(encodeURIComponent(filename), new URL(`assets/portfolio/${category}/`, window.location.href)).href;
        return { category, title: filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), type: categoryLabel(category), image: url, cover: url, video: /\.(mp4|webm)$/i.test(filename) ? url : '' };
      });
  }));
  const driveFilm = {
    category: 'film',
    title: 'Point Productions — Film',
    type: 'Film',
    cover: 'https://drive.google.com/thumbnail?id=1xjcpTbsKZn6GKUkIrAPHM9T9V_bLdL1Q&sz=w1600',
    video: 'https://drive.google.com/file/d/1xjcpTbsKZn6GKUkIrAPHM9T9V_bLdL1Q/view?usp=share_link'
  };
  renderProjects([driveFilm, ...groups.flat()]);
}

loadPortfolio().catch(() => renderProjects([]));

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.toggle('active', item === button));
    projects.forEach((project) => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    });
  });
});

projectGrid.addEventListener('click', (event) => {
  const link = event.target.closest('.project-image');
  if (!link) return;
  const project = projects.find((item) => item.querySelector('.project-image') === link);
  if (project && project.dataset.videoEmbed) {
    event.preventDefault();
    openVideo({ title: project.dataset.title, video: project.dataset.video });
  }
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
