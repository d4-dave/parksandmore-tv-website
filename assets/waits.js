/*
  TEMPORARY GITHUB PAGES PLACEHOLDER ONLY.
  Dave-approved short-lived exception: direct anonymous ThemeParks.wiki calls for the
  11 homepage Top Attraction cards only. REMOVE this file at Next.js/Vercel cutover.
  Never migrate this provider call into the production Parks & More Web application.
*/
(() => {
  const API = 'https://api.themeparks.wiki/v1/entity';
  const DESTINATIONS = [
    { id: 'e957da41-3552-4cf6-b636-5babc5cbc4e5', key: 'wdw' },
    { id: '89db5d43-c434-4097-b71f-f6869f495a22', key: 'uor' }
  ];

  const TARGETS = {
    'TRON Lightcycle / Run': 'wdw-tron',
    'Guardians of the Galaxy: Cosmic Rewind': 'wdw-guardians',
    'Rock ’n’ Roller Coaster Starring The Muppets': 'wdw-rocknroller',
    "Rock 'n' Roller Coaster Starring The Muppets": 'wdw-rocknroller',
    'Space Mountain': 'wdw-space',
    'Test Track': 'wdw-testtrack',
    'Avatar Flight of Passage': 'wdw-flight',
    "Hagrid's Magical Creatures Motorbike Adventure™": 'uor-hagrid',
    "Hagrid's Magical Creatures Motorbike Adventure": 'uor-hagrid',
    'Jurassic World VelociCoaster': 'uor-veloci',
    "Hiccup's Wing Gliders": 'uor-hiccup',
    'Harry Potter and the Battle at the Ministry™': 'uor-ministry',
    'Harry Potter and the Battle at the Ministry': 'uor-ministry',
    'Revenge of the Mummy™': 'uor-mummy',
    'Revenge of the Mummy': 'uor-mummy'
  };

  function standbyWait(item) {
    const queue = item?.queue?.STANDBY ?? item?.queue?.standby;
    return Number.isFinite(queue?.waitTime) ? queue.waitTime : null;
  }

  function normalizeStatus(status) {
    const value = String(status || 'UNKNOWN').toUpperCase();
    if (value === 'OPERATING' || value === 'OPEN') return { state: 'operating', label: 'Operating' };
    if (value === 'DOWN' || value === 'TEMPORARILY_CLOSED') return { state: 'down', label: 'Temporarily closed' };
    if (value === 'CLOSED') return { state: 'closed', label: 'Closed' };
    return { state: 'unknown', label: 'Status unavailable' };
  }

  function render(id, item) {
    const card = document.querySelector(`[data-card="${id}"]`);
    if (!card) return;
    const value = card.querySelector('.wait-value');
    const statusEl = card.querySelector('.wait-status-text');
    const wait = standbyWait(item);
    const status = normalizeStatus(item?.status);
    card.dataset.state = status.state;
    value.innerHTML = wait !== null && status.state === 'operating'
      ? `${wait} <small>min</small>`
      : status.state === 'down' ? 'Down'
      : status.state === 'closed' ? 'Closed'
      : '—';
    statusEl.textContent = status.label;
  }

  function setUnavailable() {
    document.querySelectorAll('.wait-card').forEach(card => {
      if (card.dataset.state === 'loading') {
        card.dataset.state = 'unknown';
        card.querySelector('.wait-value').textContent = '—';
        card.querySelector('.wait-status-text').textContent = 'Live status unavailable';
      }
    });
  }

  async function refresh() {
    try {
      const responses = await Promise.all(DESTINATIONS.map(d => fetch(`${API}/${d.id}/live`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      })));
      if (responses.some(r => !r.ok)) throw new Error('Provider request failed');
      const payloads = await Promise.all(responses.map(r => r.json()));
      payloads.forEach(payload => {
        const items = Array.isArray(payload?.liveData) ? payload.liveData : Array.isArray(payload) ? payload : [];
        items.forEach(item => {
          const key = TARGETS[item?.name];
          if (key) render(key, item);
        });
      });
      setUnavailable();
      const stamp = document.getElementById('wait-refresh-time');
      if (stamp) stamp.textContent = `Checked ${new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'2-digit'}).format(new Date())}`;
    } catch (_) {
      setUnavailable();
      const stamp = document.getElementById('wait-refresh-time');
      if (stamp) stamp.textContent = 'Live status temporarily unavailable';
    }
  }

  refresh();
  // ThemeParks.wiki recommends polling live data no more frequently than every 5 minutes.
  window.setInterval(refresh, 300000);
})();
