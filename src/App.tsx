import React, { useState } from 'react';
import { Header } from './components/Header';

/**
 * BOARD OF TRUSTEES — Flint Hill School (2026 website design)
 * Recreation of https://www.flinthill.org/board-of-trustees/ built on the
 * shared Apply & Engage design system (design.css): brand palette, typography
 * scale, section scaffolding (.fh-* classes), the Visit Campus hero treatment
 * (.us-hero), and the full-page site menu (Header.tsx).
 *
 * Sections (top → bottom), mirroring the live page:
 *   1. Hero — navy field, 48%/52% two-column, campus photo right with
 *      circular left-edge clip; Board of Trustees title + mission copy.
 *   2. The Board Chair — Eric Hemmer's statement + circular headshot (white).
 *   3. Meet the Board of Trustees — 22 trustee cards: circular photo, name,
 *      committees, parent class(es), employer (mist field).
 *   4. Chairman Emeritus + Trustees Emeriti (gray field).
 *   5. Board Chairs — timeline row of chairs since 1990 (white field).
 *   6. Board Committees — seven committee descriptions in the navy-field
 *      accordion (reuses the .us-belong__* machinery from design.css).
 */

const IMG = 'https://www.flinthill.org/wp-content/uploads';

/* ---------- Hero photo (2026 marketing shot, wide) ---------- */
const HERO_IMG = `${IMG}/2026/10/FH-26-MARKETING-D2-241.jpg`;

/* ---------- The Board Chair ---------- */
const CHAIR_QUOTE =
  'As trustees, our deepest commitment is to serve as the stewards of Flint Hill’s mission, core values, and student-centered learning. Our Board is charged not just with overseeing the present, but with advancing our Strategic Vision and securing Flint Hill’s legacy for future generations. Through thoughtful policy-making, rigorous financial oversight, and generous support, we ensure that our school continues to thrive as a dynamic environment of academic excellence, innovative teaching and learning, and character.';

const CHAIR_PHOTO = `${IMG}/2026/07/Eric-Hemmer-Edit2.jpg`;

/* ---------- Meet the Board — 22 trustees (live-site order: alphabetical) ---------- */
type Trustee = { name: string; img: string; roles: string[]; parent?: string; employer: string };

const TRUSTEES: Trustee[] = [
  { name: 'Keith Anderson', img: `${IMG}/2026/07/bot-webKeith-Anderson.jpg`, roles: ['Finance Committee', 'Investment Committee'], parent: 'Parent ’28', employer: 'CBG Building Company, President' },
  { name: 'Stephanie Anderson', img: `${IMG}/2026/07/BOT-Stephanie-Anderson.jpg`, roles: ['2026–27 Parents’ Association President'], parent: 'Parent ’28', employer: 'CRC Companies, Former Creative Director and Strategic Advisor' },
  { name: 'AJ Andreas', img: `${IMG}/2025/08/AJ-Andreas-1.jpg`, roles: ['Development Committee', 'Finance Committee'], parent: 'Parent ’29, ’31', employer: 'Andreas Enterprises, Vice President' },
  { name: 'Omar Balkissoon', img: `${IMG}/2023/05/OmarB-Crop220.png`, roles: ['Audit Committee', 'Investment Committee'], parent: 'Parent ’28, ’29, ’30', employer: 'Geospark Analytics, Founder and CEO' },
  { name: 'Taylor Chess', img: `${IMG}/2023/05/Chess-CROP220.jpg`, roles: ['Finance Committee', 'Development Committee'], parent: 'Parent ’13, ’14, ’18, ’21', employer: 'Peterson Companies, President, Development' },
  { name: 'Nate Davis', img: `${IMG}/2023/05/Davis-CROP.jpg`, roles: ['Executive Committee', 'Finance Committee', 'Committee on Trustees'], parent: 'Parent ’03, H’05, ’08 · Grandparent ’30', employer: 'Stride, Former CEO and Chairman' },
  { name: 'Viny Frontin, CPA', img: `${IMG}/2025/08/Viny-Frontin-board.jpeg`, roles: ['Audit Committee', 'Development Committee', 'Institutional Equity & Inclusion Committee'], parent: 'Parent H’26, ’31', employer: 'Frontec Financial, Former President and CEO' },
  { name: 'Eric Hemmer', img: `${IMG}/2026/07/Eric-Hemmer-Edit2.jpg`, roles: ['Executive Committee', 'Board Chair'], parent: 'Parent ’23', employer: 'Praxis Solutions, President' },
  { name: 'Lauren Vanni Kinard', img: `${IMG}/2025/08/Lauren-Kinard-board.jpeg`, roles: ['Development Committee', 'Finance Committee'], parent: 'Parent ’32, ’33', employer: 'First Excel Title, President' },
  { name: 'Miki Toliver King', img: `${IMG}/bb-plugin/cache/MTKing_ver2-240x300-circle-44a98f7bf2ef5bd414d37deba5782552-rca27fpi9goy.jpg`, roles: ['Audit Committee', 'Institutional Equity & Inclusion Committee'], parent: 'Parent ’24, ’28', employer: 'Google, Managing Director' },
  { name: 'Lisa Lisker', img: `${IMG}/2025/08/Lisa-Lisker.jpg`, roles: ['Audit Committee', 'Committee on Trustees Chair'], parent: 'Parent ’15, ’16', employer: 'Huckaby Davis Lisker Inc., President and CEO' },
  { name: 'Patrick McHonett', img: `${IMG}/2023/08/patrick-bot.jpg`, roles: [], parent: 'Parent ’35, ’31', employer: 'Flint Hill School, Head of School' },
  { name: 'Richard Moxley', img: `${IMG}/2023/05/Richard-Moxley.jpg`, roles: ['Executive Committee', 'Finance Committee', 'Committee on Trustees', 'Board Vice Chair'], parent: 'Parent ’16, ’18, ’21', employer: 'Razor’s Edge Ventures, Managing Partner' },
  { name: 'Joe Musella', img: `${IMG}/2023/05/Musella-CROP220.jpg`, roles: ['Investment Committee Chair', 'Committee on Trustees', 'Institutional Equity & Inclusion Committee'], parent: 'Parent ’25, ’27', employer: 'Vistage, CEO Board Chair' },
  { name: 'Kelly Nakamato', img: `${IMG}/2023/08/Kcrop.jpg`, roles: ['Audit Committee', 'Executive Committee', 'Development Committee Chair'], parent: 'Parent ’25', employer: 'PwC, Partner' },
  { name: 'Barbara O’Reilly', img: `${IMG}/2025/08/Barbara-O_Reilly2.jpg`, roles: ['Development Committee', 'Finance Committee'], parent: 'Parent ’27', employer: 'Windmill Hill Consulting, Founder and Principal' },
  { name: 'Tanaia Parker', img: `${IMG}/2023/05/Parker-CROP.png`, roles: ['Audit Committee Chair', 'Investment Committee', 'Institutional Equity & Inclusion Committee'], parent: 'Parent ’23, ’30', employer: 'T. White Parker, President and CEO' },
  { name: 'Lauren Rabbitt Aiello', img: `${IMG}/2026/07/BOT-webpage-Lauren-Rabbitt-Aiello-Headshot.jpg`, roles: ['Finance Committee', 'Development Committee'], parent: 'Parent ’33, ’34', employer: 'Waterview Capital Management, Principal · Roadside Development, Partner' },
  { name: 'Russ Reeder', img: `${IMG}/2025/08/Russ-Reeder2.jpg`, roles: ['Finance Committee', 'Investment Committee'], parent: 'Parent ’24, ’26, ’28', employer: 'KeyDelta, Founder & CEO' },
  { name: 'Darryl Schaffer', img: `${IMG}/2026/07/Darryl.jpg`, roles: ['Finance Committee', 'Investment Committee'], parent: 'Parent ’27', employer: 'Microsoft US Commercial, CTO' },
  { name: 'Mahesh Shenai', img: `${IMG}/2023/08/M2crop.jpg`, roles: ['Finance Committee', 'Institutional Equity & Inclusion Committee Chair', 'Investment Committee'], parent: 'Parent ’30, ’37', employer: 'Inova Health System, Neurosurgeon' },
  { name: 'Dave White', img: `${IMG}/2023/08/Dcrop3.jpg`, roles: ['Finance Committee Chair', 'Executive Committee'], parent: 'Parent ’27', employer: 'Independent Consultant' },
];

/* ---------- Chairman Emeritus + Trustees Emeriti (live-site copy) ---------- */
const CHAIRMAN_EMERITUS = 'John T. “Til” Hazel Jr. (deceased)';

const TRUSTEES_EMERITI = [
  'Sister Martha Carpenter, OSF',
  'Edward R. Carr',
  'Otis D. Coston Jr.',
  'John M. Dowd',
  'The Honorable Johanna L. Fitzpatrick',
  'Richard J. Hendrix',
  'Paul C. Kincheloe Jr. (deceased)',
  'Michael C. McCarey',
  'William N. Melton',
  'Norris E. Mitchell',
  'John M. Thomas',
  'Lucia “Pia” Trigiani',
  'Reverend Edwin M. Ward (deceased)',
];

/* ---------- Board Chairs — timeline since 1990 ---------- */
const BOARD_CHAIRS = [
  { name: 'Til Hazel', years: '1990 – 2010' },
  { name: 'Skip Coston', years: '2010 – 2016' },
  { name: 'Rick Hendrix', years: '2016 – 2020' },
  { name: 'Pia Trigiani', years: '2020 – 2026' },
  { name: 'Eric Hemmer', years: '2026 – Present', current: true },
];

/* ---------- Board Committees (live-site copy) ----------
   img: random placeholder photo from picsum.photos — seeded so each committee
   keeps the same image across reloads. Swap for real photos later. */
const PIC = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

const COMMITTEES = [
  {
    name: 'Audit Committee',
    img: PIC('fh-audit'),
    body: 'The Audit Committee recommends the independent auditor for Board approval and works with the auditor to establish the scope of the audit. This committee has oversight over the School’s major business and operational risks to assure the Board that the risks are identified and managed appropriately.',
  },
  {
    name: 'Committee on Trustees',
    img: PIC('fh-trustees'),
    body: 'The Committee on Trustees coordinates the identification, cultivation, recruitment and orientation of new trustees; re-nominates sitting trustees; nominates officers; and facilitates the annual Board and head of school assessment.',
  },
  {
    name: 'Development Committee',
    img: PIC('fh-development'),
    body: 'The Development Committee coordinates the School’s fundraising activities and advises the Board on the financial goals of the annual campaign and on any capital or endowment campaign.',
  },
  {
    name: 'Executive Committee',
    img: PIC('fh-executive'),
    body: 'The Executive Committee consists of the chair, vice chair, and the chairs of the Finance Committee, Committee on Trustees and Development Committee, as well as the secretary of the Corporation and up to one additional member of the Board of Trustees. This committee coordinates the work of the Board with the Board Chair; serves as a sounding board for the head of school; acts in place of the Board between Board meetings in the manner prescribed by the bylaws and as expressly delegated by the Board, and reports any actions to the Board in a timely fashion.',
  },
  {
    name: 'Finance Committee',
    img: PIC('fh-finance'),
    body: 'The Finance Committee develops the long-range financial plan and yearly operational budget, including setting tuition levels for Board approval and monitors the implementation of the budget.',
  },
  {
    name: 'Investment Committee',
    img: PIC('fh-investment'),
    body: 'The Investment Committee develops recommendations for how the School will invest its endowment and what amount of return on investment the School will use in its yearly operating budget. The committee also monitors the investment portfolio’s return.',
  },
  {
    name: 'Institutional Equity and Inclusion Committee',
    img: PIC('fh-equity'),
    body: 'The Institutional Equity and Inclusion Committee ensures continued institutional progress in developing and executing strategic equity and inclusion initiatives.',
  },
];

/* ---------- Board Committees — navy-field accordion.
   Same component markup as the financial-aid "Affording a Private School
   Education" accordion (.us-belong__* machinery in design.css). ---------- */
type AccProps = { open: number | null; setOpen: (i: number | null) => void };
const CommitteesAccordion: React.FC<AccProps> = ({ open, setOpen }) => {
  return (
    <div className="us-belong__acc">
      {COMMITTEES.map((c, i) => {
        const isOpen = open === i;
        return (
          <div key={c.name} className={`us-belong__item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="us-belong__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="us-belong__icon" aria-hidden="true">
                {/* plus that rotates into a minus when open */}
                <i />
                <i />
              </span>
              <span className="us-belong__title">{c.name}</span>
            </button>
            <div className="us-belong__panel">
              <div className="us-belong__body">
                <div className="bot-comm__row">
                  <p>{c.body}</p>
                  {/* Placeholder photo — random picsum.photos image (seeded, stable). */}
                  <img
                    className="bot-comm__photo"
                    src={c.img}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  // Board Committees — first item open on load (same behavior as the FA accordion)
  const [commOpen, setCommOpen] = useState<number | null>(0);

  return (
    /* .fhs-fpt-root scopes the ported site-header CSS */
    <div className="fhs-fpt-root">
      {/* Site header — full menu, ported 1:1 from the financial-aid project
          (E:\financial-aid\src\components/Header.tsx + design.css SITE HEADER /
          FULL-PAGE MENU OVERLAY block). */}
      <Header />

      {/* Desktop only: clearance under the fixed site header (see design.css) */}
      <div className="us-header-band" aria-hidden="true" />

      {/* ============ 1. HERO — Visit Campus hero treatment (48%/52% two-column,
          campus photo right with circular left-edge clip), Board of Trustees
          content from the live page. ============ */}
      <section className="us-hero">
        <div className="us-hero__inner">
          <div className="us-hero__col-a">
            <h1 className="fh-title">Board of<br />Trustees</h1>
            <p>The Board of Trustees’ primary responsibility is to guard the School’s mission. The Board adopts the School’s mission, vision, and strategic goals and then establishes policies that reinforce them.</p>
            <p>In addition, the Board accepts accountability for the School’s financial stability and is responsible for hiring and evaluating the head of school.</p>
          </div>
          <div className="us-hero__col-b">
            <img
              className="us-hero__photo"
              src={HERO_IMG}
              alt="Two Flint Hill students collaborating on an assignment"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ============ 2. THE BOARD CHAIR — Eric Hemmer's statement + headshot ============ */}
      <section className="fh-section bot-chair">
        <div className="fh-inner bot-chair__grid">
          <div>
            <p className="fh-eyebrow fh-eyebrow--on-light">The Board Chair</p>
            <blockquote className="bot-chair__quote">“{CHAIR_QUOTE}”</blockquote>
            <div className="bot-chair__attr">
              <span className="bot-chair__name">Eric Hemmer</span>
              <span className="bot-chair__role">Board Chair</span>
            </div>
          </div>
          <div className="bot-chair__photo-wrap">
            <img
              className="bot-chair__photo"
              src={CHAIR_PHOTO}
              alt="Eric Hemmer, Board Chair of Flint Hill School"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ============ 3. MEET THE BOARD OF TRUSTEES — 22 trustee cards ============ */}
      <section className="fh-section bot-meet">
        <div className="fh-inner">
          <h2 className="fh-title">Meet the Board of Trustees</h2>
          <p className="fh-subtitle">All committees appointed by the Board of Trustees follow the National Association of Independent Schools (NAIS) Principles of Good Practice.</p>
          <div className="bot-grid">
            {TRUSTEES.map((t) => (
              <article key={t.name} className="bot-card">
                <img className="bot-card__photo" src={t.img} alt={`Portrait of ${t.name}`} loading="lazy" />
                <h3 className="bot-card__name">{t.name}</h3>
                {t.roles.length > 0 && (
                  <div className="bot-card__roles">
                    {t.roles.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                )}
                {t.parent && <p className="bot-card__parent">{t.parent}</p>}
                <p className="bot-card__employer">{t.employer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. CHAIRMAN EMERITUS + TRUSTEES EMERITI ============ */}
      <section className="fh-section bot-emeritus">
        <div className="fh-inner">
          <div className="bot-emeritus__block">
            <p className="fh-eyebrow fh-eyebrow--on-light">Chairman Emeritus</p>
            <p className="bot-emeritus__name-lg">{CHAIRMAN_EMERITUS}</p>
          </div>
          <div className="bot-emeritus__block">
            <p className="fh-eyebrow fh-eyebrow--on-light">Trustees Emeriti</p>
            <div className="bot-emeritus__list">
              {TRUSTEES_EMERITI.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. BOARD CHAIRS — timeline since 1990 ============ */}
      <section className="fh-section bot-chairs">
        <div className="fh-inner">
          <h2 className="fh-title">Board Chairs</h2>
          <div className="bot-chairs__row">
            {BOARD_CHAIRS.map((c) => (
              <div key={c.name} className={`bot-chair-item${c.current ? ' is-current' : ''}`}>
                <span className="bot-chair-item__name">{c.name}</span>
                <span className="bot-chair-item__years">{c.years}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. BOARD COMMITTEES — navy-field accordion ============ */}
      <section className="fh-section bot-comm">
        <div className="fh-inner">
          <h2 className="fh-title">Board Committees</h2>
          <CommitteesAccordion open={commOpen} setOpen={setCommOpen} />
        </div>
      </section>
    </div>
  );
};

export default App;
