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

      const seen = new Set();
      for (const park of parks) {
        if (seen.has(park.displayName)) continue;
        seen.add(park.displayName);
        discovered.push(park);
      }
    }
    return discovered;
  }

  // TEMPORARY THROWAWAY AREA MAPPING.
  // ThemeParks.wiki's park /children payload currently flattens attractions to the
  // park parent, so the placeholder cannot derive land/area membership directly.
  // These guest-facing mappings exist only to make the temporary GitHub Pages wait
  // list easier to scan. DELETE them with this placeholder at Next.js cutover.
  const AREA_RULES = {
    'Magic Kingdom Park': [
      ['Main Street, U.S.A.', ['Main Street Vehicles', 'Walt Disney World Railroad - Main Street', 'Cinderella Castle']],
      ['Adventureland', ['Jungle Cruise', 'Pirates of the Caribbean', "Walt Disney's Enchanted Tiki Room", "A Pirate's Adventure", 'The Magic Carpets of Aladdin', 'Swiss Family Treehouse']],
      ['Frontierland', ['Big Thunder Mountain Railroad', "Tiana's Bayou Adventure", 'Country Bear Musical Jamboree']],
      ['Liberty Square', ['Haunted Mansion', 'The Hall of Presidents']],
      ['Fantasyland', ['Seven Dwarfs Mine Train', 'Peter Pan', 'small world', 'Dumbo', 'Prince Charming Regal Carrousel', 'Mad Tea Party', "Mickey's PhilharMagic", 'Winnie the Pooh', 'Under the Sea', 'Enchanted Tales with Belle', 'The Barnstormer', 'Walt Disney World Railroad - Fantasyland', "Casey Jr. Splash"]],
      ['Tomorrowland', ['TRON Lightcycle', 'Space Mountain', 'Buzz Lightyear', 'Tomorrowland Speedway', 'PeopleMover', 'Carousel of Progress', 'Monsters, Inc. Laugh Floor', 'Astro Orbiter']]
    ],
    'EPCOT': [
      ['World Celebration', ['Spaceship Earth', 'Journey Into Imagination', 'Disney and Pixar Short Film Festival']],
      ['World Discovery', ['Guardians of the Galaxy', 'Mission: SPACE', 'Test Track']],
      ['World Nature', ['Soarin', 'Living with the Land', 'The Seas with Nemo', 'Turtle Talk']],
      ['World Showcase – France', ['Beauty and the Beast Sing-Along']],
      ['World Showcase – Canada', ['Canada Far and Wide']],
      ['World Showcase – China', ['Reflections of China']],
      ['World Showcase', ['Frozen Ever After', 'Gran Fiesta Tour', "Remy's Ratatouille Adventure", 'American Adventure']]
    ],
    "Disney's Hollywood Studios": [
      ['Hollywood Boulevard', ['Mickey & Minnie’s Runaway Railway', "Mickey & Minnie's Runaway Railway"]],
      ['Echo Lake', ['Star Tours', 'Indiana Jones', 'Vacation Fun']],
      ['Grand Avenue', ['Muppet', 'Mama Melrose']],
      ['Star Wars: Galaxy’s Edge', ['Rise of the Resistance', 'Millennium Falcon']],
      ['Toy Story Land', ['Slinky Dog Dash', 'Toy Story Mania', 'Alien Swirling Saucers']],
      ['Animation Courtyard', ['Walt Disney Presents', 'Disney Junior']],
      ['Sunset Boulevard', ['Tower of Terror', 'Rock ’n’ Roller Coaster', "Rock 'n' Roller Coaster", 'Lightning McQueen']]
    ],
    "Disney's Animal Kingdom Theme Park": [
      ['Oasis', ['The Oasis Exhibits', 'Wilderness Explorers']],
      ['Discovery Island', ["It's Tough to be a Bug", 'Tree of Life', 'Discovery Island Trails']],
      ['Tree of Life', ['Zootopia: Better Zoogether']],
      ['Pandora – The World of Avatar', ['Avatar Flight of Passage', 'Na’vi River Journey', "Na'vi River Journey"]],
      ['Africa', ['Kilimanjaro Safaris', 'Gorilla Falls', 'Wildlife Express Train']],
      ['Rafiki’s Planet Watch', ['Conservation Station', 'Affection Section', 'Animation Experience']],
      ['Asia', ['Expedition Everest', 'Kali River Rapids', 'Maharajah Jungle Trek']],
      ['DinoLand U.S.A.', ['DINOSAUR', 'TriceraTop Spin']]
    ],
    'Universal Studios Florida': [
      ['Minion Land', ['Despicable Me Minion Mayhem', 'Villain-Con Minion Blast']],
      ['New York', ['Revenge of the Mummy', 'Race Through New York', 'TRANSFORMERS']],
      ['San Francisco', ['Fast & Furious', 'Fast and Furious']],
      ['The Wizarding World of Harry Potter – Diagon Alley', ['Escape from Gringotts', "Hogwarts Express™ - King's Cross", "Hogwarts Express - King's Cross"]],
      ['World Expo', ['MEN IN BLACK']],
      ['Springfield, U.S.A.', ['The Simpsons Ride', 'Kang & Kodos']],
      ['DreamWorks Land', ['Trolls Trollercoaster', 'Po’s Kung Fu Training Camp', "Po's Kung Fu Training Camp"]],
      ['Hollywood', ['E.T. Adventure']],
      ['Halloween Horror Nights', ['Cybergoria', 'Evil Dead Burn', 'Bloodengutz', 'Hellraiser', 'INVASION: Alien Abduction', 'Jack & Oddfellow', 'MADLANDS', 'Ozzy Osbourne', 'Sinners', 'Stranger Things 5']]
    ],
    "Universal's Islands of Adventure": [
      ['Port of Entry', []],
      ['Marvel Super Hero Island', ['Incredible Hulk', 'Doctor Doom', 'Storm Force', 'The Amazing Adventures of Spider-Man']],
      ['Toon Lagoon', ['Dudley Do-Right', 'Popeye & Bluto']],
      ['Skull Island', ['Skull Island']],
      ['Jurassic Park', ['Jurassic World VelociCoaster', 'Jurassic Park River Adventure', 'Pteranodon Flyers']],
      ['The Wizarding World of Harry Potter – Hogsmeade', ['Forbidden Journey', 'Flight of the Hippogriff', "Hagrid's Magical Creatures", 'Hogwarts Express']],
      ['The Lost Continent', []],
      ['Seuss Landing', ['Cat in the Hat', 'High in the Sky Seuss', 'Caro-Seuss-el', 'One Fish, Two Fish']]
    ],
    'Universal Islands of Adventure': null,
    'Universal Epic Universe': [
      ['Celestial Park', ['Stardust Racers', 'Constellation Carousel', 'Astronomica']],
      ['Super Nintendo World', ['Mario Kart', "Yoshi's Adventure", 'Mine-Cart Madness', 'Bowser Jr. Challenge']],
      ['Dark Universe', ['Monsters Unchained', 'Curse of the Werewolf']],
      ['The Wizarding World of Harry Potter – Ministry of Magic', ['Battle at the Ministry']],
      ['How to Train Your Dragon – Isle of Berk', ["Hiccup's Wing Gliders", 'Dragon Racer', 'Fyre Drill']]
    ],
    'Epic Universe': null,
    "Universal's Volcano Bay": [
      ['The Volcano', ['Ko’okiri Body Plunge', "Ko'okiri Body Plunge", 'Krakatau Aqua Coaster', 'Punga Racers']],
      ['Rainforest Village', ['Honu', 'Ika Moana', 'Maku', 'Puihi', 'Taniwha Tubes', 'TeAwa The Fearless River']],
      ['River Village', ['Kopiko Wai Winding River', 'Runamukka Reef', 'Tot Tiki Reef']]
    ],
    'Volcano Bay': null
  };


  // TEMPORARY PLACEHOLDER HIDE LIST.
  // These provider entities are intentionally omitted from the disposable public
  // waits page because they are not useful guest-facing standby-wait cards here.
  // This is not authoritative curation and must be deleted at Next.js cutover.
  const HIDDEN_ATTRACTIONS = {
    'EPCOT': [
      'Advanced Training Lab',
      'American Heritage Gallery',
      'Awesome Planet',
      'Bijutsu-kan Gallery',
      "Bruce's Shark World",
      'Gallery of Arts and History',
      'House of the Whispering Willows',
      'ImageWorks - The "What If" Labs',
      'Impressions de France',
      'Journey of Water, Inspired by Moana',
      'Kidcot Fun Stops',
      'Mexico Folk Art Gallery',
      'Palais du Cinéma',
      'Project Tomorrow: Inventing the Wonders of the Future',
      'SeaBase Aquarium',
      'Stave Church Gallery'
    ],
    'Universal Studios Florida': [
      'Hogwarts™ Express - First Train',
      'Hogwarts™ Express - Last Train',
      'Hogwarts Express - First Train',
      'Hogwarts Express - Last Train'
    ],
    "Universal's Islands of Adventure": [
      'Camp Jurassic™',
      'Camp Jurassic',
      'If I Ran The Zoo™',
      'If I Ran The Zoo',
      'Jurassic Park Discovery Center',
      'Me Ship, The Olive®',
      'Me Ship, The Olive'
    ]
  };

  AREA_RULES['Universal Islands of Adventure'] = AREA_RULES["Universal's Islands of Adventure"];
  AREA_RULES['Epic Universe'] = AREA_RULES['Universal Epic Universe'];
  AREA_RULES['Volcano Bay'] = AREA_RULES["Universal's Volcano Bay"];
  HIDDEN_ATTRACTIONS['Universal Islands of Adventure'] = HIDDEN_ATTRACTIONS["Universal's Islands of Adventure"];

  function normalizeMatchText(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[™®©]/g, '')
      .replace(/[’‘]/g, "'")
      .replace(/[–—]/g, '-')
      .toLowerCase();
  }

  function isHiddenAttraction(parkName, attractionName) {
    const hidden = HIDDEN_ATTRACTIONS[parkName] || [];
    const normalizedName = normalizeMatchText(attractionName);
    return hidden.some(name => normalizedName === normalizeMatchText(name));
  }

  function resolveMappedArea(parkName, attractionName) {
    const rules = AREA_RULES[parkName] || [];
    const normalizedName = normalizeMatchText(attractionName);

    for (let order = 0; order < rules.length; order += 1) {
      const [areaName, needles] = rules[order];
      if (needles.some(needle => normalizedName.includes(normalizeMatchText(needle)))) {
        return { id: `${parkName}::${areaName}`, name: areaName, order };
      }
    }

    return { id: '__other__', name: 'Other Attractions', order: Number.MAX_SAFE_INTEGER };
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

  function areaSection(area) {
    const cards = area.attractions
      .sort((a, b) => String(a?.name || '').localeCompare(String(b?.name || '')))
      .map(attractionCard)
      .join('');

    return `<section class="land-waits-group">
      <div class="land-waits-head">
        <h3>${escapeHtml(area.name)}</h3>
        <span>${area.attractions.length}</span>
      </div>
      <div class="wait-grid all-waits-grid">${cards}</div>
    </section>`;
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
      .filter(item => !isHiddenAttraction(park.name, item?.name));
    const areas = new Map();

    for (const item of attractions) {
      const area = resolveMappedArea(park.name, item?.name);
      if (!areas.has(area.id)) areas.set(area.id, { ...area, attractions: [] });
      areas.get(area.id).attractions.push(item);
    }

    const grouped = [...areas.values()]
      .sort((a, b) => a.order - b.order || String(a.name).localeCompare(String(b.name)));

    const content = attractions.length
      ? `<div class="land-waits-list">${grouped.map(areaSection).join('')}</div>`
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
  window.setInterval(() => refresh(), REFRESH_MS);
})();
