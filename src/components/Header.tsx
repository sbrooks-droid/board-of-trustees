import React, { useState, useEffect } from 'react';

const LOGO_URL = 'https://flinthillstg.wpenginepowered.com/wp-content/uploads/2019/11/FHLINE-768x61.png';
const HOME_URL = 'https://flinthillstg.wpenginepowered.com/';

// Sub menu (utility) row — label + destination
type NavLink = { label: string; href: string };

const UTILITY_LINKS: NavLink[] = [
  { label: 'Apply Now', href: 'https://imagine.flinthill.org/register/applytoFH' },
  { label: 'Visit Campus', href: 'https://flinthillstg.wpenginepowered.com/visit-campus/' },
  { label: 'Request Info', href: 'https://imagine.flinthill.org/register/inquiryform' },
  { label: 'Flint Hill Futures', href: 'https://futures.flinthill.org' },
  { label: 'Podcast', href: 'https://imaginewhatspossible.org' },
  { label: 'Summer on the Hill', href: 'https://flinthillstg.wpenginepowered.com/summer-on-the-hill/' },
  { label: 'Give', href: 'https://www.givecampus.com/s/988x8i' },
];

// Lookup helper for CTA links / remaining links
const utilLink = (label: string) => UTILITY_LINKS.find((l) => l.label === label)!;

const SEARCH_URL = 'https://flinthillstg.wpenginepowered.com/search/';

// Husky Login icon — kept visible in the overlay's bottom-left stack
const HUSKY_LOGIN = {
  url: 'https://flinthill.myschoolapp.com/',
  img: 'https://flinthillstg.wpenginepowered.com/wp-content/uploads/2023/04/huskylogin-60x61.png',
};

// Featured thumbnail cards in the overlay bottom-right stack:
// latest podcast episode + first Futures article (image left, title right)
type FeaturedCard = { title: string; img: string; href: string; label?: string; logo?: string; tone: string };
const FEATURED_CARDS: FeaturedCard[] = [
  {
    title: 'Building Effective Readers: The Science of Learning to Read',
    img: 'https://imaginewhatspossible.org/wp-content/uploads/2026/10/iwp-ep13-featuredimage.jpg',
    href: 'https://imaginewhatspossible.org/home/',
    /* White SVG logo replaces the text label, top-left of the card (user request) */
    logo: 'https://imaginewhatspossible.org/wp-content/uploads/2026/01/Podcast-Art_White.svg',
    tone: 'tone-blue',
  },
  {
    title: "Coffee, Crayfish, and Community: Tyson Zhang '18 Building Rural Economies with the Peace Corps & Keeping People First",
    img: 'https://futures.flinthill.org/wp-content/uploads/2026/10/Tyson-Zhang-for-article-banner.jpg',
    href: 'https://futures.flinthill.org/peacecorps-coffee-crayfish-community/',
    /* Logo replaces the text label, top-left of the card (same treatment as podcast) */
    logo: 'https://futures.flinthill.org/wp-content/uploads/2019/11/Alumni-Site-Logo2-768x128.png',
    tone: 'tone-green',
  },
];

// Latest Husky Highlights blog article — bottom-left quadrant of the full-page menu
const HIGHLIGHTS_CARD = {
  title: 'Clubs at Flint Hill: How a Vision Statement Actually Lives in the Hallways',
  img: 'https://www.flinthill.org/wp-content/uploads/2026/11/55618198238_ece76b8047_k.jpg',
  href: 'https://www.flinthill.org/blog/clubs-at-flint-hill-how-a-vision-statement-actually-lives-in-the-hallways/',
  labelA: 'Husky',
  labelB: 'Highlights',
  tone: 'tone-white',
};

// Main menu items — trigger (optional URL) + dropdown links
type MainItem = { label: string; href?: string; links?: NavLink[]; athletics?: boolean };

const MAIN_ITEMS: MainItem[] = [
  {
    label: 'About Us', // no page of its own — opens the sub-list only
    links: [
      { label: 'Strategic Vision', href: 'https://flinthillstg.wpenginepowered.com/strategic-vision/' },
      { label: 'Our History', href: 'https://flinthillstg.wpenginepowered.com/our-history/' },
      { label: 'Faculty & Staff', href: 'https://flinthillstg.wpenginepowered.com/faculty-staff/' },
      { label: 'Board of Trustees', href: 'https://flinthillstg.wpenginepowered.com/board-of-trustees/' },
      { label: 'FAQs', href: 'https://flinthillstg.wpenginepowered.com/faqs/' },
      { label: 'Employment', href: 'https://flinthillstg.wpenginepowered.com/employment/' },
    ],
  },
  {
    label: 'Admission',
    href: 'https://flinthillstg.wpenginepowered.com/apply-engage/#home',
    links: [
      { label: 'Apply & Engage', href: 'https://flinthillstg.wpenginepowered.com/apply-engage/' },
      { label: 'Tuition & Financial Aid', href: 'https://flinthillstg.wpenginepowered.com/tuition-and-financial-aid/' },
      { label: 'Visit Campus', href: 'https://flinthillstg.wpenginepowered.com/visit-campus/' },
      { label: 'Virtual Events', href: 'https://flinthillstg.wpenginepowered.com/virtual-events/' },
      { label: 'Request Info', href: 'https://imagine.flinthill.org/register/inquiryform' },
    ],
  },
  {
    label: 'Academics', // no page of its own — opens the sub-list only
    links: [
      { label: 'Lower School', href: 'https://flinthillstg.wpenginepowered.com/lower-school/' },
      { label: 'Middle School', href: 'https://flinthillstg.wpenginepowered.com/middle-school/' },
      { label: 'Upper School', href: 'https://flinthillstg.wpenginepowered.com/upper-school' },
      { label: 'College Advising', href: 'https://flinthillstg.wpenginepowered.com/college-advising/' },
      { label: 'Student Success', href: 'https://flinthillstg.wpenginepowered.com/student-success-resources' },
    ],
  },
  {
    label: 'Arts',
    href: 'https://flinthillstg.wpenginepowered.com/arts/',
    links: [
      { label: 'Arts Program', href: 'https://flinthillstg.wpenginepowered.com/arts/' },
      { label: 'Box Office', href: 'https://flinthillstg.wpenginepowered.com/boxoffice' },
    ],
  },
  { label: 'Athletics', href: 'https://flinthillstg.wpenginepowered.com/athletics', athletics: true },
  {
    label: 'Community', // no page of its own — opens the sub-list only
    links: [
      { label: 'Alumni', href: 'https://flinthillstg.wpenginepowered.com/alumni/' },
      { label: "Parents' Association", href: 'https://flinthillstg.wpenginepowered.com/parents-association/' },
      { label: 'Community Events', href: 'https://flinthillstg.wpenginepowered.com/community-events/' }, // TODO: confirm URL — 404s on both domains for now
      { label: 'School Store', href: 'https://store.flinthill.org' },
    ],
  },
  {
    label: 'Giving',
    href: 'https://flinthillstg.wpenginepowered.com/how-to-give/',
    links: [
      { label: 'Support Flint Hill', href: 'https://www.givecampus.com/s/988x8i' },
      { label: 'Flint Hill Fund', href: 'https://flinthillstg.wpenginepowered.com/flint-hill-fund/' },
      { label: 'Flintflix — The Impact of Your Giving', href: 'https://flintflix.flinthill.org' },
    ],
  },
  {
    label: 'Media Hub', // no page of its own — opens the sub-list only
    links: [
      { label: 'Husky Highlights Blog', href: 'https://flinthillstg.wpenginepowered.com/husky-highlights' },
      { label: 'Flint Hill Futures Magazine', href: 'https://futures.flinthill.org/' },
      { label: "Imagine What's Possible Podcast", href: 'https://imaginewhatspossible.org/' },
    ],
  },
];

// Athletics — three seasons of teams (shown in the overlay's sub-list)
const ATHLETICS_PROGRAM_URL = 'https://flinthillstg.wpenginepowered.com/athletics';
type Season = { season: string; teams: NavLink[] };

const ATHLETICS_SEASONS: Season[] = [
  {
    season: 'Fall Teams',
    teams: [
      { label: 'Cross Country', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-cross-country/' },
      { label: 'Field Hockey', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-field-hockey/' },
      { label: 'Dance Team', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-dance-team/' },
      { label: 'Football', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-football/' },
      { label: 'Golf', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-golf/' },
      { label: "Boys' Soccer", href: 'https://flinthillstg.wpenginepowered.com/boys-soccer-fall/' },
      { label: "Girls' Soccer", href: 'https://flinthillstg.wpenginepowered.com/girls-soccer-fall/' },
      { label: "Girls' Tennis", href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-tennis_fall/' },
      { label: 'Volleyball', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-volleyball/' },
    ],
  },
  {
    season: 'Winter Teams',
    teams: [
      { label: "Boys' Basketball", href: 'https://flinthillstg.wpenginepowered.com/athletics/boys-basketball/' },
      { label: "Girls' Basketball", href: 'https://flinthillstg.wpenginepowered.com/athletics/girls-basketball/' },
      { label: 'Climbing', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-climbing/' },
      { label: 'Dance Team', href: 'https://flinthillstg.wpenginepowered.com/athletics-winter-dance-team/' },
      { label: 'Ice Hockey', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-icehockey/' },
      { label: 'Indoor Track & Field', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-winter-indoor-track/' },
      { label: 'Swim', href: 'https://flinthillstg.wpenginepowered.com/athletics/swim-dive/' },
      { label: 'Dive', href: 'https://flinthillstg.wpenginepowered.com/athletics/dive/' },
      { label: 'Squash', href: 'https://flinthillstg.wpenginepowered.com/athletics/squash/' },
    ],
  },
  {
    season: 'Spring Teams',
    teams: [
      { label: 'Baseball', href: 'https://flinthillstg.wpenginepowered.com/athletics-baseball/' },
      { label: "Boys' Lacrosse", href: 'https://flinthillstg.wpenginepowered.com/boys-lacrosse/' },
      { label: "Girls' Lacrosse", href: 'https://flinthillstg.wpenginepowered.com/girls-lacrosse/' },
      { label: 'Softball', href: 'https://flinthillstg.wpenginepowered.com/athletics/softball/' },
      { label: "Boys' Tennis", href: 'https://flinthillstg.wpenginepowered.com/boys-tennis-spring/' },
      { label: 'Track & Field', href: 'https://flinthillstg.wpenginepowered.com/athletics/athletics-track-and-field/' },
    ],
  },
];

// Overlay top-left image per main section (all already used elsewhere in this project)
const SECTION_IMAGES: Record<string, string> = {
  'About Us': 'https://www.flinthill.org/wp-content/uploads/2026/10/FH-26-MARKETING-D2-241.jpg',
  Admission: 'https://flinthillstg.wpenginepowered.com/wp-content/uploads/2026/10/imagine-gen.jpg',
  Academics: 'https://www.flinthill.org/wp-content/uploads/2026/10/h-Middle-School.jpg',
  Arts: 'https://www.flinthill.org/wp-content/uploads/2026/10/TheatrePerformances.jpg',
  Athletics: 'https://www.flinthill.org/wp-content/uploads/2026/10/cardAthletics-.jpg',
  Community: 'https://www.flinthill.org/wp-content/uploads/2026/10/Homecoming.jpg',
  Giving: 'https://flinthillstg.wpenginepowered.com/wp-content/uploads/2026/10/lead-support-gen.jpg',
  'Media Hub': 'https://www.flinthill.org/wp-content/uploads/2026/10/FH-26-MARKETING-D2-241.jpg', // placeholder — swap if you have a media-specific shot
};

export const Header: React.FC = () => {
  const [compact, setCompact] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [seasonOpen, setSeasonOpen] = useState<Record<string, boolean>>({}); // Athletics season accordions

  // Scrolled past the hero → collapse to just the floating hamburger
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the full-page menu is open
  useEffect(() => {
    if (!overlayOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  // Escape closes the menu (and clears the selected section)
  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlayOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [overlayOpen]);

  // Open with NO section selected — user picks one; seasons collapsed each time
  useEffect(() => {
    if (overlayOpen) {
      setActiveSection(null);
      setSeasonOpen({});
    }
  }, [overlayOpen]);

  const activeItem = MAIN_ITEMS.find((i) => i.label === activeSection) || null;

  return (
    <>
      <header className={`fhs-site-header${compact ? ' is-compact' : ''}${overlayOpen ? ' is-menu-open' : ''}`}>
        <div className="fhs-site-header-body">
          {/* Logo — left, max-width 180px at any viewport width */}
          <a className="fhs-site-header-logo" href={HOME_URL} target="_blank" rel="noopener noreferrer" aria-label="Flint Hill School — home">
            <img src={LOGO_URL} alt="Flint Hill School" />
          </a>

          {/* Right group: quick links (left of search) | search | summer/husky (menu-open only) | burger */}
          <div className="fhs-site-header-right">
            <nav className="fhs-site-header-quick" aria-label="Quick links">
              <a href={utilLink('Apply Now').href} target="_blank" rel="noopener noreferrer">Apply Now</a>
              <span className="fhs-quick-divider" aria-hidden="true" />
              <a href={utilLink('Visit Campus').href} target="_blank" rel="noopener noreferrer">Visit Campus</a>
              <span className="fhs-quick-divider" aria-hidden="true" />
              <a href={utilLink('Request Info').href} target="_blank" rel="noopener noreferrer">Request Info</a>
            </nav>

            <a className="fhs-site-header-search" href={SEARCH_URL} target="_blank" rel="noopener noreferrer" aria-label="Search">
              <span className="fhs-search-label">Search</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </a>

            {/* Search | divider | Summer on the Hill | divider | Husky Hub + icon — left of the burger/X */}
            <span className="fhs-bar-divider" aria-hidden="true" />
            <a className="fhs-bar-summer" href={utilLink('Summer on the Hill').href} target="_blank" rel="noopener noreferrer">
              Summer on the Hill
            </a>
            <span className="fhs-bar-divider fhs-husky-divider" aria-hidden="true" />
            <a className="fhs-bar-husky" href={HUSKY_LOGIN.url} target="_blank" rel="noopener noreferrer">
              <span className="fhs-husky-label">Husky Hub</span>
              <img src={HUSKY_LOGIN.img} alt="" width={24} height={25} />
            </a>

            {/* Mobile only: search + Husky Hub icons (no hover labels), right of the logo / left of the burger-X */}
            <span className="fhs-bar-icons">
              <a href={SEARCH_URL} target="_blank" rel="noopener noreferrer" aria-label="Search">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
              </a>
              <a href={HUSKY_LOGIN.url} target="_blank" rel="noopener noreferrer" aria-label="Husky Hub">
                <img src={HUSKY_LOGIN.img} alt="" width={30} height={31} />
              </a>
            </span>

            <button
              type="button"
              className={`fhs-site-header-burger${overlayOpen ? ' is-open' : ''}`}
              aria-label={overlayOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={overlayOpen}
              onClick={() => setOverlayOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Full-page menu overlay — navy takeover */}
      {overlayOpen && (
        <div className="fhs-menu-overlay" role="dialog" aria-modal="true" aria-label="Site menu">
          {/* Top-left: one image per section, cross-fading with the selection */}
          <div className="fhs-menu-overlay-img" aria-hidden="true">
            {MAIN_ITEMS.map((item) => (
              <img
                key={item.label}
                src={SECTION_IMAGES[item.label]}
                alt=""
                loading="lazy"
                className={`fhs-menu-overlay-img-layer${activeSection === item.label ? ' is-active' : ''}`}
              />
            ))}
          </div>

          {/* Vertical white line down the middle (stops short of top & bottom) */}
          <span className="fhs-menu-overlay-vline" aria-hidden="true" />

          {/* Top-right: main items, stacked, larger type */}
          <nav className="fhs-menu-overlay-main" aria-label="Main menu">
            {MAIN_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`fhs-menu-overlay-main-item${activeSection === item.label ? ' is-active' : ''}`}
                aria-expanded={activeSection === item.label}
                onClick={() => setActiveSection((s) => (s === item.label ? null : item.label))}
              >
                {item.label}
              </button>
            ))}

          </nav>

          {/* Right of main column: sub-links of the selected section */}
          {/* data-lenis-prevent: let this list scroll natively — Lenis smooth-scroll would otherwise swallow the wheel events */}
          <nav className={`fhs-menu-overlay-sub${activeItem ? ' is-visible' : ''}`} aria-label="Section menu" data-lenis-prevent>
            {/* key={activeSection}: remounts on every section switch so the slide-in animation replays */}
            <div key={activeSection} className="fhs-menu-overlay-sub-inner">
              {activeItem?.links && (
              <>
                {activeItem.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ))}
              </>
            )}
            {activeItem?.athletics && (
              <>
                <a href={ATHLETICS_PROGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Athletics Program
                </a>
                {ATHLETICS_SEASONS.map((s) => (
                  <div key={s.season} className="fhs-menu-overlay-season-group">
                    <button
                      type="button"
                      className={`fhs-menu-overlay-season-head${seasonOpen[s.season] ? ' is-open' : ''}`}
                      aria-expanded={!!seasonOpen[s.season]}
                      onClick={() => setSeasonOpen((m) => ({ ...m, [s.season]: !m[s.season] }))}
                    >
                      <span>{s.season}</span>
                      <svg
                        className="fhs-menu-overlay-season-chev"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {seasonOpen[s.season] && (
                      <div className="fhs-menu-overlay-season-teams">
                        {s.teams.map((team) => (
                          <a key={team.label} href={team.href} target="_blank" rel="noopener noreferrer">
                            {team.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
            </div>
          </nav>

          {/* Bottom-left quadrant (desktop only): latest Husky Highlights article — same card style as the dock */}
          <a
            className={`fhs-menu-dock-card fhs-menu-dock-left ${HIGHLIGHTS_CARD.tone}`}
            href={HIGHLIGHTS_CARD.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={HIGHLIGHTS_CARD.img} alt="" loading="lazy" />
            <span className="fhs-menu-dock-card-label fhs-hh">{HIGHLIGHTS_CARD.labelA} <span>{HIGHLIGHTS_CARD.labelB}</span></span>
            <span>{HIGHLIGHTS_CARD.title}</span>
          </a>

          {/* Desktop: thumbnails + links dock, left of the main menu column. Mobile: utility links + search/husky icons (previous layout) */}
          <nav className="fhs-menu-dock" aria-label="More links">
            <div className="fhs-menu-dock-cards">
              {FEATURED_CARDS.map((c) => (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className={`fhs-menu-dock-card ${c.tone}`}>
                  <img src={c.img} alt="" loading="lazy" />
                  {c.logo ? (
                    <img className="fhs-menu-dock-card-logo" src={c.logo} alt="" loading="lazy" />
                  ) : (
                    <span className={`fhs-menu-dock-card-label ${c.tone}`}>{c.label}</span>
                  )}
                  <span>{c.title}</span>
                </a>
              ))}
            </div>

            <span className="fhs-menu-dock-divider" aria-hidden="true" />

            <div className="fhs-menu-dock-links">
              {/* Mobile only (this list is hidden on desktop): quick links moved here, above Flint Hill Futures */}
              {['Apply Now', 'Visit Campus', 'Request Info'].map((label) => (
                <a key={label} href={utilLink(label).href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              ))}
              {['Flint Hill Futures', 'Podcast', 'Summer on the Hill'].map((label) => (
                <a key={label} href={utilLink(label).href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              ))}
              <a href={utilLink('Give').href} target="_blank" rel="noopener noreferrer">
                Give
              </a>
            </div>

          </nav>
        </div>
      )}
    </>
  );
};
