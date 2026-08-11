(() => {
  const list = document.getElementById('news-list');
  if (!list) return;

  const escapeHtml = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const formatDate = (dateValue) => {
    const parsed = new Date(`${dateValue}T12:00:00`);
    return Number.isNaN(parsed.getTime())
      ? dateValue
      : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  fetch('/news/articles.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`News catalog request failed: ${response.status}`);
      return response.json();
    })
    .then((articles) => {
      const sorted = [...articles].sort((a, b) => String(b.date).localeCompare(String(a.date)));
      if (!sorted.length) {
        list.innerHTML = '<div class="empty-news"><strong>News section is live.</strong><br>New stories will appear here as they are published.</div>';
        return;
      }

      list.innerHTML = sorted.map((article) => `
        <a class="news-card" href="/news/${encodeURIComponent(article.slug)}/">
          <time datetime="${escapeHtml(article.date)}">${escapeHtml(formatDate(article.date))}</time>
          <h2>${escapeHtml(article.title)}</h2>
          <p>${escapeHtml(article.description)}</p>
        </a>
      `).join('');
    })
    .catch(() => {
      list.innerHTML = '<div class="empty-news"><strong>News is temporarily unavailable.</strong><br>Please check back shortly.</div>';
    });
})();
