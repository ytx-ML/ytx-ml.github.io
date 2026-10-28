(() => {
  'use strict';
  const data = window.SITE_DATA || {};
  const profile = data.profile || {};
  const escapeHtml = (value = '') => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const safeUrl = (value) => {
    const url = String(value || '').trim();
    if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
    if (url && !/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('//')) return url;
    return '';
  };
  const externalAttrs = (url) => /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
  const icons = {
    location: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    university: '<path d="m3 8 9-5 9 5H3ZM4 21h16M3 18h18M6 10v8M10 10v8M14 10v8M18 10v8"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    github: '<path d="M12 2.8a9.3 9.3 0 0 0-2.94 18.13c.46.09.63-.2.63-.44v-1.8c-2.56.56-3.1-1.09-3.1-1.09-.42-1.06-1.02-1.34-1.02-1.34-.84-.57.06-.56.06-.56.93.06 1.42.95 1.42.95.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.04-.23-4.19-1.02-4.19-4.56 0-1 .36-1.83.95-2.47-.1-.23-.41-1.17.09-2.43 0 0 .78-.25 2.55.94a8.8 8.8 0 0 1 4.64 0c1.77-1.2 2.55-.94 2.55-.94.5 1.26.19 2.2.09 2.43.59.64.95 1.46.95 2.47 0 3.55-2.15 4.32-4.2 4.55.33.28.62.84.62 1.69v2.63c0 .24.17.53.63.44A9.3 9.3 0 0 0 12 2.8z"/>',
    scholar: '<path d="m2 9 10-5 10 5-10 5-10-5zm4 3v6c4 2 8 2 12 0v-6M22 9v7"/>',
    file: '<path d="M14 3H5v18h14V8l-5-5zm0 0v5h5M8 12h8M8 16h6"/>',
    link: '<path d="M14 3h7v7M21 3 10 14M10 5H4v15h15v-6"/>',
    moon: '<path d="M20.7 13a9 9 0 0 1-9.7-9.7A9 9 0 1 0 20.7 13Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>'
  };
  const icon = (name) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || icons.link) + '</svg>';
  const linkMarkup = (label, url, iconName) => '<a href="' + escapeHtml(url) + '"' + externalAttrs(url) + '>' + icon(iconName) + '<span>' + escapeHtml(label) + '</span></a>';
  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    node.textContent = value || '';
    node.hidden = !value;
  };

  const renderProfile = () => {
    setText('#profile-name', profile.name);
    setText('#profile-cn-name', profile.chineseName ? '(' + profile.chineseName + ')' : '');
    setText('#profile-role', profile.role);
    const location = document.querySelector('#profile-location');
    location.hidden = !profile.location;
    location.innerHTML = profile.location ? icon('location') + '<span>' + escapeHtml(profile.location) + '</span>' : '';
    const affiliation = document.querySelector('#profile-affiliation');
    affiliation.hidden = !profile.affiliation;
    const affiliationUrl = safeUrl(profile.affiliationUrl);
    affiliation.innerHTML = profile.affiliation
      ? icon('university') + (affiliationUrl
        ? '<a href="' + escapeHtml(affiliationUrl) + '"' + externalAttrs(affiliationUrl) + '>' + escapeHtml(profile.affiliation) + '</a>'
        : '<span>' + escapeHtml(profile.affiliation) + '</span>')
      : '';
    const bio = document.querySelector('#profile-bio');
    const advisorName = String(profile.advisorName || '').trim();
    const advisorUrl = safeUrl(profile.advisorUrl);
    const advisorInBio = Boolean(advisorName && String(profile.shortBio || '').includes(advisorName));
    let bioMarkup = escapeHtml(profile.shortBio || '');
    if (advisorInBio && advisorUrl) {
      bioMarkup = bioMarkup.replace(escapeHtml(advisorName), '<a href="' + escapeHtml(advisorUrl) + '"' + externalAttrs(advisorUrl) + '>' + escapeHtml(advisorName) + '</a>');
    }
    bio.innerHTML = bioMarkup;
    bio.hidden = !profile.shortBio;
    document.querySelector('.brand').textContent = profile.name || 'Academic Homepage';
    document.title = (profile.name || 'Academic Homepage') + ' | Academic Homepage';

    const email = document.querySelector('#profile-email');
    email.hidden = !profile.email;
    if (profile.email) {
      email.href = 'mailto:' + profile.email;
      email.innerHTML = icon('mail') + '<span>' + escapeHtml(profile.email) + '</span>';
    }
    const socialLinks = [
      { label: 'Google Scholar', url: profile.googleScholar, icon: 'scholar' },
      { label: 'GitHub', url: profile.github, icon: 'github' },
      { label: 'CV', url: profile.cv, icon: 'file' }
    ].map((item) => ({ ...item, url: safeUrl(item.url) })).filter((item) => item.url);
    document.querySelector('#profile-links').innerHTML = socialLinks.map((item) => linkMarkup(item.label, item.url, item.icon)).join('');
    const scholarUrl = safeUrl(profile.googleScholar);
    const scholarLabel = icon('scholar') + '<span>Google Scholar</span>';
    document.querySelector('#publications-scholar').innerHTML = scholarUrl
      ? '<a class="scholar-link" href="' + escapeHtml(scholarUrl) + '"' + externalAttrs(scholarUrl) + '>' + scholarLabel + '</a>'
      : '<span class="scholar-link is-unavailable" aria-disabled="true">' + scholarLabel + '</span>';

    const portrait = document.querySelector('#profile-portrait');
    const initials = String(profile.name || '').split(/\s+/).filter(Boolean).map((name) => name[0]).join('');
    const placeholder = '<span class="portrait-initials" aria-hidden="true">' + escapeHtml(initials) + '</span>';
    const imageUrl = safeUrl(profile.profileImage);
    portrait.innerHTML = imageUrl
      ? '<img src="' + escapeHtml(imageUrl) + '" alt="' + escapeHtml(profile.name) + '" width="168" height="224">'
      : placeholder;
    if (imageUrl) portrait.querySelector('img').addEventListener('error', () => { portrait.innerHTML = placeholder; }, { once: true });

    const advisor = document.querySelector('#profile-advisor');
    advisor.hidden = !advisorName || advisorInBio;
    if (advisorName && !advisorInBio) {
      advisor.innerHTML = 'Advised by ' + (advisorUrl
        ? '<a href="' + escapeHtml(advisorUrl) + '"' + externalAttrs(advisorUrl) + '>' + escapeHtml(advisorName) + '</a>'
        : escapeHtml(advisorName)) + '.';
    }
    const hasBio = Boolean(profile.shortBio || profile.advisorName);
    document.querySelector('#profile-bio-container').hidden = !hasBio;
  };

  const renderPublications = (filter = 'all') => {
    const all = data.publications || [];
    const papers = filter === 'all' ? all : all.filter((paper) => paper.type === filter);
    const list = document.querySelector('#publication-list');
    list.innerHTML = papers.map((paper) => {
      const links = (paper.links || []).map((link) => ({ ...link, url: safeUrl(link.url) })).filter((link) => link.url);
      const paperLink = links.find((link) => /^(paper|arxiv)$/i.test(link.label));
      const title = paperLink
        ? '<a href="' + escapeHtml(paperLink.url) + '"' + externalAttrs(paperLink.url) + '>' + escapeHtml(paper.title) + '</a>'
        : escapeHtml(paper.title);
      const authors = (paper.authors || []).map((author) => author === profile.name ? '<strong>' + escapeHtml(author) + '</strong>' : escapeHtml(author)).join(', ');
      const imageUrl = safeUrl(paper.image);
      let thumbnail = '';
      if (imageUrl) {
        const picture = '<img src="' + escapeHtml(imageUrl) + '" alt="' + escapeHtml(paper.imageAlt || paper.title) + '" loading="lazy" decoding="async">';
        thumbnail = paperLink
          ? '<a class="publication-thumbnail" href="' + escapeHtml(paperLink.url) + '"' + externalAttrs(paperLink.url) + '>' + picture + '</a>'
          : '<div class="publication-thumbnail">' + picture + '</div>';
      }
      return '<article class="publication-card' + (imageUrl ? ' has-image' : '') + '">' + thumbnail +
        '<div class="publication-content"><h3>' + title + '</h3>' +
        (authors ? '<p class="authors">' + authors + '</p>' : '') +
        '<div class="publication-meta">' +
        (paper.venueShort ? '<span class="venue-badge' + (paper.type === 'preprint' ? ' preprint' : '') + '">' + escapeHtml(paper.venueShort) + '</span>' : '') +
        (paper.type === 'accepted' && paper.ccfRank ? '<span class="ccf-badge">CCF ' + escapeHtml(paper.ccfRank) + '</span>' : '') +
        (paper.venue ? '<span class="venue">' + escapeHtml(paper.venue) + '</span>' : '') +
        '</div>' +
        (paper.summary ? '<p class="publication-summary">' + escapeHtml(paper.summary) + '</p>' : '') +
        '<div class="publication-links">' + links.map((link) => linkMarkup(link.label, link.url, link.label.toLowerCase() === 'code' ? 'github' : 'file')).join('') +
        '</div></div></article>';
    }).join('') || '<p class="empty-state">No publications in this category yet.</p>';
    list.querySelectorAll('.publication-thumbnail img').forEach((img) => {
      img.addEventListener('error', () => {
        const card = img.closest('.publication-card');
        img.closest('.publication-thumbnail').remove();
        card.classList.remove('has-image');
      }, { once: true });
    });
  };

  const renderNews = () => {
    const items = data.news || [];
    document.querySelector('#news').hidden = !items.length;
    document.querySelector('nav a[href="#news"]').hidden = !items.length;
    document.querySelector('#news-list').innerHTML = items.map((item) => {
      const url = safeUrl(item.link);
      const itemIcon = item.kind === 'paper' ? '🎉' : item.kind === 'award' ? '🏅' : '';
      const text = (itemIcon ? '<span class="news-icon" aria-hidden="true">' + itemIcon + '</span> ' : '') + escapeHtml(item.text);
      const content = url ? '<a href="' + escapeHtml(url) + '"' + externalAttrs(url) + '>' + text + '</a>' : text;
      return '<article class="news-item"><time datetime="' + escapeHtml(String(item.date || '').replaceAll('.', '-')) + '">' + escapeHtml(item.date) + '</time><p>' + content + '</p></article>';
    }).join('');
  };

  const renderAwards = () => {
    const items = data.awards || [];
    const section = document.querySelector('#awards');
    section.hidden = !items.length;
    document.querySelector('#award-list').innerHTML = items.map((item) =>
      '<article class="award-item"><time datetime="' + escapeHtml(String(item.date || '').replaceAll('.', '-')) + '">' + escapeHtml(item.date) + '</time>' +
      '<p><strong>' + escapeHtml(item.title) + '</strong></p>' +
      (item.organization ? '<span class="award-organization">' + escapeHtml(item.organization) + '</span>' : '') +
      '</article>'
    ).join('');
  };

  const setupFilters = () => {
    document.querySelectorAll('.filter-button').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach((item) => {
          item.classList.toggle('is-active', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        renderPublications(button.dataset.filter);
      });
    });
  };

  const setupTheme = () => {
    const toggle = document.querySelector('.theme-toggle');
    const applyTheme = (theme) => {
      const dark = theme === 'dark';
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      toggle.innerHTML = icon(dark ? 'sun' : 'moon');
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      document.querySelector('meta[name="theme-color"]').content = dark ? '#191b1e' : '#ffffff';
    };
    let saved = 'light';
    try { saved = localStorage.getItem('academic-home-theme') || 'light'; } catch { /* Local file preview may restrict storage. */ }
    applyTheme(saved);
    toggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('academic-home-theme', next); } catch { /* Theme still works without persistent storage. */ }
    });
  };

  renderProfile();
  renderPublications();
  renderNews();
  renderAwards();
  setupFilters();
  setupTheme();
})();
