const filters = document.querySelectorAll('.filter');
const projectGrid = document.querySelector('#project-grid');
const languageButton = document.querySelector('.language-toggle');
let projects = [];

const translations = {
  en: {
    'nav a:nth-child(1)': 'About', 'nav a:nth-child(2)': 'Portfolio', 'nav a:nth-child(3)': 'Service', 'nav a:nth-child(4)': 'Contact',
    '.contact-link': 'Let’s talk', '.hero-content .eyebrow': 'Independent image & film production · Vietnam', '.hero h1': 'We don’t just shoot.<br><em>We build brand visuals.</em>', '.hero-bottom p': 'Thoughtful films and images<br>for brands, people and culture.', '.hero-caption': 'A POINT OF VIEW, IN MOTION',
    '#about > .eyebrow': 'A little about us', '.intro-copy h2': 'Good work starts<br>with a <em>point of view.</em>', '.intro-copy > div > p:first-child': 'Point Productions is an independent production company based in Ho Chi Minh City. We develop and produce films, photography and campaigns with care, clarity and a strong creative point of view.', '.intro-copy > div > p:nth-child(2)': 'From the first conversation to the final frame, we bring the right people together to make work that feels considered and leaves a lasting impression.', '.intro-copy .text-link': 'Meet the people', '.about-approach .eyebrow': 'How we work', '.about-approach h3': 'From first thought<br>to <em>final frame.</em>', '.about-approach > p:last-child': 'We listen closely, shape the idea together and take care of every detail in production. A focused team, built around what each story needs.', '.about-team .eyebrow': 'The people behind the work', '.about-team h3': 'A small team.<br><em>A wider view.</em>', '.about-team-lead': 'A close-knit core team and a trusted network of creative collaborators, assembled around each project.', '.team-note': 'Team profiles and portraits are ready to be filled with the company’s approved information.',
    '#work .section-heading .eyebrow': 'Portfolio', '#work .section-heading h2': 'Made with <em>intention.</em>', '[data-filter="all"]': 'All work', '[data-filter="product"]': 'Product', '[data-filter="event"]': 'Events', '[data-filter="portrait"]': 'Portraits', '[data-filter="film"]': 'Film', '#portfolio-note': 'Add images to the matching portfolio folder to display projects here.',
    '#services .section-heading .eyebrow': 'What we do', '#services .section-heading h2': 'Good ideas,<br><em>well made.</em>', '#services .services-lead': 'A close-knit team, a trusted creative network, and the right people for every story.', '#services .service-list > div:nth-child(1) h3': 'Film & motion', '#services .service-list > div:nth-child(1) p': 'Brand films, commercials, documentaries and social content.', '#services .service-list > div:nth-child(2) h3': 'Photography', '#services .service-list > div:nth-child(2) p': 'Campaign, portrait, product and editorial imagery.', '#services .service-list > div:nth-child(3) h3': 'Creative production', '#services .service-list > div:nth-child(3) p': 'Creative development, production and post-production.',
    '[data-partners-eyebrow]': 'Selected collaborators', '[data-partners-title]': 'Good company.<br><em>Good work.</em>', '#partners-note': 'Partner logos will appear here when added to the partners folder.',
    '#contact .eyebrow': 'Contact', '#contact h2': 'Let’s make<br><em>something matter.</em>', '.contact-button': 'Email us', '.footer > span:first-of-type': 'Independent image & film production.', '.footer > a:last-child': 'Back to top ↑'
  },
  vi: {
    'nav a:nth-child(1)': 'Giới thiệu', 'nav a:nth-child(2)': 'Portfolio', 'nav a:nth-child(3)': 'Dịch vụ', 'nav a:nth-child(4)': 'Liên hệ',
    '.contact-link': 'Liên hệ', '.hero-content .eyebrow': 'Sản xuất hình ảnh & phim độc lập · Việt Nam', '.hero h1': 'Không chỉ ghi hình.<br><em>Chúng tôi xây dựng hình ảnh thương hiệu.</em>', '.hero-bottom p': 'Phim và hình ảnh chỉn chu<br>cho thương hiệu, con người và văn hoá.', '.hero-caption': 'GÓC NHÌN RIÊNG, CHUYỂN ĐỘNG',
    '#about > .eyebrow': 'Về chúng tôi', '.intro-copy h2': 'Bắt đầu từ<br><em>một góc nhìn.</em>', '.intro-copy > div > p:first-child': 'Point Productions là công ty sản xuất độc lập tại TP. Hồ Chí Minh. Chúng tôi phát triển và sản xuất phim, nhiếp ảnh và chiến dịch thương hiệu bằng sự chỉn chu, rõ ràng và góc nhìn sáng tạo riêng.', '.intro-copy > div > p:nth-child(2)': 'Từ cuộc trò chuyện đầu tiên đến khung hình cuối cùng, chúng tôi kết nối đúng những con người để tạo nên tác phẩm có chủ đích và đọng lại lâu dài.', '.intro-copy .text-link': 'Gặp gỡ đội ngũ', '.about-approach .eyebrow': 'Cách chúng tôi làm việc', '.about-approach h3': 'Từ ý tưởng đầu tiên<br>đến <em>khung hình cuối.</em>', '.about-approach > p:last-child': 'Chúng tôi lắng nghe, cùng phát triển ý tưởng và chăm chút từng chi tiết trong quá trình sản xuất. Một đội ngũ tinh gọn, được xây dựng theo nhu cầu của mỗi câu chuyện.', '.about-team .eyebrow': 'Những người tạo nên tác phẩm', '.about-team h3': 'Đội ngũ tinh gọn.<br><em>Tầm nhìn rộng mở.</em>', '.about-team-lead': 'Đội ngũ nòng cốt gắn kết cùng mạng lưới cộng tác viên sáng tạo đáng tin cậy, được kết nối riêng cho từng dự án.', '.team-note': 'Thông tin và chân dung đội ngũ sẽ được cập nhật theo nội dung chính thức của công ty.',
    '#work .section-heading .eyebrow': 'Portfolio', '#work .section-heading h2': 'Tác phẩm với <em>chủ đích.</em>', '[data-filter="all"]': 'Tất cả', '[data-filter="product"]': 'Sản phẩm', '[data-filter="event"]': 'Sự kiện', '[data-filter="portrait"]': 'Chân dung', '[data-filter="film"]': 'Phim', '#portfolio-note': 'Thêm hình ảnh vào thư mục danh mục tương ứng để hiển thị tại đây.',
    '#services .section-heading .eyebrow': 'Dịch vụ', '#services .section-heading h2': 'Ý tưởng hay,<br><em>thực hiện chỉn chu.</em>', '#services .services-lead': 'Đội ngũ tinh gọn, mạng lưới cộng tác viên tin cậy và những con người phù hợp cho từng câu chuyện.', '#services .service-list > div:nth-child(1) h3': 'Phim & chuyển động', '#services .service-list > div:nth-child(1) p': 'Phim thương hiệu, quảng cáo, phim tài liệu và nội dung mạng xã hội.', '#services .service-list > div:nth-child(2) h3': 'Nhiếp ảnh', '#services .service-list > div:nth-child(2) p': 'Hình ảnh chiến dịch, chân dung, sản phẩm và biên tập.', '#services .service-list > div:nth-child(3) h3': 'Sản xuất sáng tạo', '#services .service-list > div:nth-child(3) p': 'Phát triển ý tưởng, sản xuất và hậu kỳ.',
    '[data-partners-eyebrow]': 'Đối tác & khách hàng', '[data-partners-title]': 'Đồng hành tốt.<br><em>Tác phẩm tốt.</em>', '#partners-note': 'Logo đối tác sẽ hiển thị tại đây khi được thêm vào thư mục partners.',
    '#contact .eyebrow': 'Liên hệ', '#contact h2': 'Cùng tạo nên<br><em>điều đáng nhớ.</em>', '.contact-button': 'Gửi email', '.footer > span:first-of-type': 'Sản xuất hình ảnh & phim độc lập.', '.footer > a:last-child': 'Lên đầu trang ↑'
  }
};

function setLanguage(language) {
  const dictionary = translations[language];
  for (const [selector, content] of Object.entries(dictionary)) {
    document.querySelectorAll(selector).forEach((element) => {
      const arrow = element.querySelector(':scope > span[aria-hidden="true"]');
      const counter = element.matches('.filter') ? element.querySelector('span')?.textContent : null;
      element.innerHTML = content + (counter !== null ? ` <span>${counter}</span>` : '') + (arrow ? ` <span aria-hidden="true">↗</span>` : '');
    });
  }
  const contactLabels = language === 'vi'
    ? { address: 'Địa chỉ', tax: 'Mã số thuế', phone: 'Điện thoại', email: 'Email' }
    : { address: 'Address', tax: 'Tax ID', phone: 'Phone', email: 'Email' };
  document.querySelectorAll('[data-contact-label]').forEach((label) => {
    label.textContent = contactLabels[label.dataset.contactLabel];
  });
  document.documentElement.lang = language;
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch language to Vietnamese' : 'Chuyển ngôn ngữ sang tiếng Anh');
  languageButton.innerHTML = language === 'en' ? 'VI <span>/</span> EN' : 'VI <span>/</span> EN';
  languageButton.dataset.language = language;
  localStorage.setItem('point-productions-language', language);
}

languageButton.addEventListener('click', () => setLanguage(languageButton.dataset.language === 'vi' ? 'en' : 'vi'));
setLanguage(localStorage.getItem('point-productions-language') || 'en');

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

async function loadPartnerLogos() {
  const response = await fetch('assets/partners/index.txt');
  if (!response.ok) return;
  const names = (await response.text()).split(/\r?\n/).filter((name) => /\.(svg|png|jpe?g|webp)$/i.test(name));
  const logoList = document.querySelector('#partner-logos');
  logoList.replaceChildren(...names.map((name) => {
    const image = document.createElement('img');
    image.src = new URL(encodeURIComponent(name.trim()), new URL('assets/partners/', window.location.href)).href;
    image.alt = name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    image.loading = 'lazy';
    image.onerror = () => image.remove();
    return image;
  }));
  document.querySelector('#partners-note').hidden = names.length > 0;
}

loadPartnerLogos().catch(() => {});

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
