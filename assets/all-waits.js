/*
  TEMPORARY GITHUB PAGES PLACEHOLDER ONLY.
  Dave-approved short-lived exception: direct anonymous ThemeParks.wiki calls for
  the temporary /wait-times/ page while the Parks & More Backend/Vercel path is
  observed before cutover. REMOVE this file and page at Next.js/Vercel cutover.
  Never migrate this provider call into the production Parks & More Web application.
*/
(() => {
  const API = 'https://api.themeparks.wiki/v1/entity';
  const REFRESH_MS = 300000;

  const DESTINATIONS = [
    {
      id: 'e957da41-3552-4cf6-b636-5babc5cbc4e5',
      key: 'wdw',
      name: 'Walt Disney World',
      parks: [
        'Magic Kingdom Park',
        'EPCOT',
        "Disney's Hollywood Studios",
        "Disney's Animal Kingdom Theme Park"
      ]
    },
    {
      id: '89db5d43-c434-4097-b71f-f6869f495a22',
      key: 'uor',
      name: 'Universal Orlando Resort',
      parks: [
        'Universal Studios Florida',
        "Universal's Islands of Adventure",
        'Universal Islands of Adventure',
        'Universal Epic Universe',
        'Epic Universe',
        "Universal's Volcano Bay",
        'Volcano Bay'
      ]
    }
  ];

  const destinationEl = document.getElementById('all-waits-destinations');
  const refreshedEl = document.getElementById('all-waits-refresh-time');
  const refreshButton = document.getElementById('all-waits-refresh');
  let parkCatalog = null;
  let refreshInFlight = false;

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function standbyWait(item) {
    const queue = item?.queue?.STANDBY ?? item?.queue?.standby;
    return Number.isFinite(queue?.waitTime) ? queue.waitTime : null;
  }

  function normalizeStatus(status) {
    const value = String(status || 'UNKNOWN').toUpperCase();
    if (value === 'OPERATING' || value === 'OPEN') return { state: 'operating', label: 'Operating' };
    if (value === 'DOWN' || value === 'TEMPORARILY_CLOSED') return { state: 'down', label: 'Temporarily closed' };
    if (value === 'REFURBISHMENT') return { state: 'refurbishment', label: 'Refurbishment' };
    if (value === 'CLOSED') return { state: 'closed', label: 'Closed' };
    return { state: 'unknown', label: 'Status unavailable' };
  }

  function displayParkName(name) {
    if (name === "Disney's Animal Kingdom Theme Park") return "Disney's Animal Kingdom";
    if (name === "Universal's Islands of Adventure") return 'Islands of Adventure';
    if (name === 'Universal Islands of Adventure') return 'Islands of Adventure';
    if (name === 'Universal Epic Universe') return 'Epic Universe';
    if (name === "Universal's Volcano Bay") return 'Volcano Bay';
    return name;
  }

  function allowedPark(destination, parkName) {
    return destination.parks.includes(parkName);
  }

  async function fetchJson(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Provider request failed (${response.status})`);
    return response.json();
  }

  async function discoverParks() {
    const discovered = [];
    for (const destination of DESTINATIONS) {
      const payload = await fetchJson(`${API}/${destination.id}/children`);
      const children = Array.isArray(payload?.children) ? payload.children : [];
      const parks = children
        .filter(item => String(item?.entityType || '').toUpperCase() === 'PARK')
        .filter(item => allowedPark(destination, item?.name))
        .map(item => ({
          id: item.id,
          name: item.name,
          displayName: displayParkName(item.name),
          destinationKey: destination.key,
          destinationName: destination.name
        }));

      // De-duplicate aliases if the provider happens to return equivalent park names.
      const seen = new Set();
      for (const park of parks) {
        if (seen.has(park.displayName)) continue;
        seen.add(park.displayName);
        discovered.push(park);
      }
    }
    return discovered;
  }

  function attractionCard(item) {
    const wait = standbyWait(item);
    const status = normalizeStatus(item?.status);
    const waitText = wait !== null && status.state === 'operating'
      ? `${wait} <small>min</small>`
      : status.state === 'down' ? 'Down'
      : status.state === 'refurbishment' ? 'Refurb'
      : status.state === 'closed' ? 'Closed'
      : '—';
    const detail = wait === null && status.state === 'operating'
      ? 'No posted standby wait'
      : status.label;

    return `<article class="wait-card all-waits-card" data-state="${status.state}">
      <h3>${escapeHtml(item?.name || 'Attraction')}</h3>
      <div class="wait-value">${waitText}</div>
      <div class="wait-status"><span class="status-dot-small"></span><span>${escapeHtml(detail)}</span></div>
    </article>`;
  }

  function parkSection(park, items, error = null) {
    if (error) {
      return `<section class="park-waits-block">
        <div class="park-waits-head"><h2>${escapeHtml(park.displayName)}</h2><span>Unavailable</span></div>
        <div class="wait-page-message">Live attraction data is temporarily unavailable for this park.</div>
      </section>`;
    }

    const attractions = items
      .filter(item => String(item?.entityType || '').toUpperCase() === 'ATTRACTION')
      .sort((a, b) => String(a?.name || '').localeCompare(String(b?.name || '')));

    const content = attractions.length
      ? `<div class="wait-grid all-waits-grid">${attractions.map(attractionCard).join('')}</div>`
      : '<div class="wait-page-message">No live attraction entries are currently available for this park.</div>';

    return `<section class="park-waits-block">
      <div class="park-waits-head"><h2>${escapeHtml(park.displayName)}</h2><span>${attractions.length} attractions</span></div>
      ${content}
    </section>`;
  }

  function destinationSection(destination, parkResults) {
    return `<section class="destination-waits-section" aria-labelledby="${destination.key}-waits-heading">
      <div class="destination-waits-head">
        <p class="eyebrow">${escapeHtml(destination.key === 'wdw' ? 'WDW' : 'UOR')}</p>
        <h2 id="${destination.key}-waits-heading">${escapeHtml(destination.name)}</h2>
      </div>
      ${parkResults.map(result => parkSection(result.park, result.items || [], result.error)).join('')}
    </section>`;
  }

  function setLoading() {
    if (!destinationEl) return;
    destinationEl.innerHTML = '<div class="wait-page-message">Loading current attraction waits…</div>';
    if (refreshedEl) refreshedEl.textContent = 'Updating live status…';
  }

  async function refresh({ initial = false } = {}) {
    if (refreshInFlight) return;
    refreshInFlight = true;
    if (refreshButton) refreshButton.disabled = true;
    if (initial) setLoading();

    try {
      if (!parkCatalog) parkCatalog = await discoverParks();

      const groupedHtml = [];
      for (const destination of DESTINATIONS) {
        const parks = parkCatalog.filter(park => park.destinationKey === destination.key);
        const results = await Promise.all(parks.map(async park => {
          try {
            const payload = await fetchJson(`${API}/${park.id}/live`);
            const items = Array.isArray(payload?.liveData) ? payload.liveData : [];
            return { park, items };
          } catch (error) {
            return { park, error };
          }
        }));
        groupedHtml.push(destinationSection(destination, results));
      }

      destinationEl.innerHTML = groupedHtml.join('');
      if (refreshedEl) {
        refreshedEl.textContent = `Checked ${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`;
      }
    } catch (_) {
      destinationEl.innerHTML = '<div class="wait-page-message">Live wait data is temporarily unavailable. Please try again shortly.</div>';
      if (refreshedEl) refreshedEl.textContent = 'Live status temporarily unavailable';
    } finally {
      refreshInFlight = false;
      if (refreshButton) refreshButton.disabled = false;
    }
  }

  if (refreshButton) refreshButton.addEventListener('click', () => refresh());
  refresh({ initial: true });
  // ThemeParks.wiki live data is polled no more frequently than every 5 minutes.
  window.setInterval(() => refresh(), REFRESH_MS);
})();
