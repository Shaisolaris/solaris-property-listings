"use client";

import { useEffect, useMemo, useState } from "react";

type PropertyType = "House" | "Condo" | "Townhouse" | "Loft";

type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  yearBuilt: number;
  featured: boolean;
  new: boolean;
  gradient: string;
  accent: string;
  description: string;
  agent: {
    name: string;
    initials: string;
    agency: string;
    phone: string;
    email: string;
  };
  features: string[];
};

const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Sunlit Brownstone with Roof Deck",
    address: "142 Beacon Street",
    city: "Boston, MA",
    neighborhood: "Back Bay",
    price: 2_450_000,
    beds: 4,
    baths: 3,
    sqft: 2_840,
    type: "House",
    yearBuilt: 1897,
    featured: true,
    new: false,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    accent: "from-amber-500/20",
    description:
      "Rare four-bedroom Back Bay brownstone with a private roof deck and original 19th-century detailing. Chef's kitchen, primary suite with walk-in closet, and direct garage parking.",
    agent: {
      name: "Maya Chen",
      initials: "MC",
      agency: "Beacon & Oak",
      phone: "(617) 555-0142",
      email: "maya@beaconoak.com",
    },
    features: ["Roof deck", "Garage parking", "Chef's kitchen", "Wine cellar"],
  },
  {
    id: "p2",
    title: "Light-Filled Seaport Loft",
    address: "88 Seaport Boulevard #907",
    city: "Boston, MA",
    neighborhood: "Seaport",
    price: 1_180_000,
    beds: 2,
    baths: 2,
    sqft: 1_420,
    type: "Loft",
    yearBuilt: 2019,
    featured: false,
    new: true,
    gradient: "from-sky-400 via-cyan-500 to-indigo-600",
    accent: "from-sky-500/20",
    description:
      "Corner loft with 14-foot ceilings and harbor views on two sides. Chef's kitchen with waterfall island, full amenity building with concierge and rooftop pool.",
    agent: {
      name: "Daniel Okafor",
      initials: "DO",
      agency: "Harbor One",
      phone: "(617) 555-0188",
      email: "daniel@harborone.com",
    },
    features: ["Harbor views", "Concierge", "Rooftop pool", "In-unit laundry"],
  },
  {
    id: "p3",
    title: "Modern Cambridge Townhouse",
    address: "54 Brattle Street",
    city: "Cambridge, MA",
    neighborhood: "Harvard Square",
    price: 1_650_000,
    beds: 3,
    baths: 2.5,
    sqft: 2_100,
    type: "Townhouse",
    yearBuilt: 2016,
    featured: true,
    new: false,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    accent: "from-emerald-500/20",
    description:
      "Contemporary three-story townhouse a block from Harvard Yard. Private garden, two-car garage, and Solar-ready roof. Walking distance to Red Line.",
    agent: {
      name: "Priya Iyer",
      initials: "PI",
      agency: "Cambridge Collective",
      phone: "(617) 555-0244",
      email: "priya@cambridgecol.com",
    },
    features: ["Private garden", "2-car garage", "Solar ready", "Smart home"],
  },
  {
    id: "p4",
    title: "Cozy North End One-Bedroom",
    address: "27 Hanover Street #3B",
    city: "Boston, MA",
    neighborhood: "North End",
    price: 649_000,
    beds: 1,
    baths: 1,
    sqft: 720,
    type: "Condo",
    yearBuilt: 1908,
    featured: false,
    new: true,
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    accent: "from-rose-500/20",
    description:
      "Charming one-bedroom in the heart of the North End. Exposed brick, original hardwoods, and a renovated kitchen. Steps to cafés, parks, and the harbor walk.",
    agent: {
      name: "Sam Whittaker",
      initials: "SW",
      agency: "Hanover Realty",
      phone: "(617) 555-0316",
      email: "sam@hanoverrealty.com",
    },
    features: ["Exposed brick", "Renovated kitchen", "Elevator", "Pet friendly"],
  },
  {
    id: "p5",
    title: "Beacon Hill Garden Duplex",
    address: "12 Myrtle Street",
    city: "Boston, MA",
    neighborhood: "Beacon Hill",
    price: 3_200_000,
    beds: 4,
    baths: 3.5,
    sqft: 3_100,
    type: "House",
    yearBuilt: 1845,
    featured: true,
    new: false,
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    accent: "from-violet-500/20",
    description:
      "Historic Beacon Hill duplex with private garden, six original fireplaces, and a fully renovated kitchen. First time on the market in 40 years.",
    agent: {
      name: "Lia Romero",
      initials: "LR",
      agency: "Hill & Harbor",
      phone: "(617) 555-0412",
      email: "lia@hillharbor.com",
    },
    features: ["6 fireplaces", "Private garden", "Historic", "Deeded parking"],
  },
  {
    id: "p6",
    title: "South End Loft with Studio",
    address: "305 Tremont Street #4",
    city: "Boston, MA",
    neighborhood: "South End",
    price: 1_095_000,
    beds: 2,
    baths: 2,
    sqft: 1_580,
    type: "Loft",
    yearBuilt: 2002,
    featured: false,
    new: false,
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    accent: "from-amber-500/20",
    description:
      "Warm loft with a glassed-in work studio, gas fireplace, and south-facing windows. Building has a shared garden and bike storage.",
    agent: {
      name: "Ben Grossman",
      initials: "BG",
      agency: "South End Living",
      phone: "(617) 555-0499",
      email: "ben@seliving.com",
    },
    features: ["Work studio", "Gas fireplace", "Shared garden", "Bike storage"],
  },
  {
    id: "p7",
    title: "Charlestown Waterfront Condo",
    address: "4 Constitution Plaza #602",
    city: "Charlestown, MA",
    neighborhood: "Charlestown",
    price: 879_000,
    beds: 2,
    baths: 2,
    sqft: 1_180,
    type: "Condo",
    yearBuilt: 2008,
    featured: false,
    new: true,
    gradient: "from-blue-400 via-indigo-500 to-violet-600",
    accent: "from-indigo-500/20",
    description:
      "Sixth-floor condo with panoramic views of the Boston skyline. Two deeded parking spots, concierge, and direct harbor walk access.",
    agent: {
      name: "Maya Chen",
      initials: "MC",
      agency: "Beacon & Oak",
      phone: "(617) 555-0142",
      email: "maya@beaconoak.com",
    },
    features: ["Skyline views", "2 parking spots", "Concierge", "Harbor walk"],
  },
  {
    id: "p8",
    title: "Jamaica Plain Craftsman",
    address: "78 Pond Street",
    city: "Boston, MA",
    neighborhood: "Jamaica Plain",
    price: 1_320_000,
    beds: 4,
    baths: 2,
    sqft: 2_240,
    type: "House",
    yearBuilt: 1912,
    featured: false,
    new: false,
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    accent: "from-emerald-500/20",
    description:
      "Classic four-bedroom craftsman across from Jamaica Pond. Screened porch, updated systems, and a huge finished basement. Perfect for a growing family.",
    agent: {
      name: "Daniel Okafor",
      initials: "DO",
      agency: "Harbor One",
      phone: "(617) 555-0188",
      email: "daniel@harborone.com",
    },
    features: ["Screened porch", "Finished basement", "Near pond", "Detached garage"],
  },
  {
    id: "p9",
    title: "Somerville Artist Loft",
    address: "231 Somerville Ave #5",
    city: "Somerville, MA",
    neighborhood: "Union Square",
    price: 725_000,
    beds: 1,
    baths: 1,
    sqft: 980,
    type: "Loft",
    yearBuilt: 1998,
    featured: false,
    new: false,
    gradient: "from-fuchsia-400 via-pink-500 to-rose-600",
    accent: "from-pink-500/20",
    description:
      "True artist loft with 16-foot ceilings, north-facing studio windows, and concrete floors. Converted warehouse, walking distance to Green Line extension.",
    agent: {
      name: "Priya Iyer",
      initials: "PI",
      agency: "Cambridge Collective",
      phone: "(617) 555-0244",
      email: "priya@cambridgecol.com",
    },
    features: ["16ft ceilings", "Studio space", "Freight elevator", "Bike room"],
  },
  {
    id: "p10",
    title: "Brookline Victorian",
    address: "94 Pleasant Street",
    city: "Brookline, MA",
    neighborhood: "Coolidge Corner",
    price: 2_190_000,
    beds: 5,
    baths: 3.5,
    sqft: 3_480,
    type: "House",
    yearBuilt: 1890,
    featured: true,
    new: false,
    gradient: "from-teal-400 via-cyan-500 to-sky-600",
    accent: "from-cyan-500/20",
    description:
      "Grand five-bedroom Victorian with wrap-around porch, period details, and a fully renovated kitchen. Walk to Coolidge Corner shops and the C Line.",
    agent: {
      name: "Sam Whittaker",
      initials: "SW",
      agency: "Hanover Realty",
      phone: "(617) 555-0316",
      email: "sam@hanoverrealty.com",
    },
    features: ["Wrap porch", "Period details", "Chef's kitchen", "Near T"],
  },
  {
    id: "p11",
    title: "Fenway Studio in Doorman Building",
    address: "33 Peterborough Street #8C",
    city: "Boston, MA",
    neighborhood: "Fenway",
    price: 465_000,
    beds: 0,
    baths: 1,
    sqft: 540,
    type: "Condo",
    yearBuilt: 1964,
    featured: false,
    new: true,
    gradient: "from-indigo-400 via-blue-500 to-sky-600",
    accent: "from-blue-500/20",
    description:
      "Renovated studio in a 24-hour doorman building. New kitchen, full bath, and a Juliet balcony overlooking the Fens. Low condo fee includes heat.",
    agent: {
      name: "Lia Romero",
      initials: "LR",
      agency: "Hill & Harbor",
      phone: "(617) 555-0412",
      email: "lia@hillharbor.com",
    },
    features: ["24h doorman", "Juliet balcony", "Low fee", "Heat included"],
  },
  {
    id: "p12",
    title: "Waltham New Construction",
    address: "18 River Street",
    city: "Waltham, MA",
    neighborhood: "Prospect Hill",
    price: 1_475_000,
    beds: 4,
    baths: 3,
    sqft: 2_680,
    type: "House",
    yearBuilt: 2025,
    featured: false,
    new: true,
    gradient: "from-orange-400 via-red-500 to-rose-600",
    accent: "from-red-500/20",
    description:
      "Brand-new four-bedroom build with modern open floor plan, high-efficiency systems, and a two-car garage. Fully electric, EV charger included.",
    agent: {
      name: "Ben Grossman",
      initials: "BG",
      agency: "South End Living",
      phone: "(617) 555-0499",
      email: "ben@seliving.com",
    },
    features: ["New build", "EV charger", "Open plan", "Energy efficient"],
  },
];

const TYPES = ["All", "House", "Condo", "Townhouse", "Loft"] as const;

function formatPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  return `$${(n / 1000).toFixed(0)}K`;
}

export default function PropertyListings() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [bedsMin, setBedsMin] = useState(0);
  const [priceMax, setPriceMax] = useState<number>(4_000_000);
  const [selected, setSelected] = useState<Property | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState(
    "I'd like to schedule a tour of this property. When are you available this week?"
  );
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("solaris-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("solaris-theme", next ? "dark" : "light");
  };

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (bedsMin > 0 && p.beds < bedsMin) return false;
      if (p.price > priceMax) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, type, bedsMin, priceMax]);

  const closeModal = () => {
    setSelected(null);
    setSent(false);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
            S
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold">Solaris Estates</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Boston metro
            </div>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400 md:flex">
          <span className="text-slate-900 dark:text-white">Buy</span>
          <span>Rent</span>
          <span>Sell</span>
          <span>Mortgages</span>
          <span>Saved</span>
        </nav>
        <button
          type="button"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      <section className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Find your next place in Boston.
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          {PROPERTIES.length} homes on the market right now. Filter by neighborhood,
          price, and bedrooms.
        </p>
      </section>

      <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search neighborhood, city, or title…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as (typeof TYPES)[number])}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-950"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All types" : t}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Bedrooms (min)</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {bedsMin === 0 ? "Any" : `${bedsMin}+`}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={bedsMin}
              onChange={(e) => setBedsMin(Number(e.target.value))}
              className="mt-2 w-full accent-sky-500"
            />
          </div>
          <div>
            <label className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Max price</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatPrice(priceMax)}
              </span>
            </label>
            <input
              type="range"
              min={400_000}
              max={4_000_000}
              step={50_000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="mt-2 w-full accent-sky-500"
            />
          </div>
        </div>
      </section>

      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {filtered.length} match{filtered.length === 1 ? "" : "es"}
      </p>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} onClick={() => setSelected(p)} />
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          No properties match those filters. Try loosening the price or bedroom range.
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={closeModal}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur hover:text-slate-900 dark:bg-slate-900/90 dark:text-slate-300"
            >
              ✕
            </button>
            <div
              className={`relative h-56 w-full bg-gradient-to-br ${selected.gradient} sm:h-72`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    {selected.neighborhood} · {selected.city}
                  </div>
                  <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
                    {selected.title}
                  </h2>
                </div>
                <div className="text-3xl font-bold drop-shadow-sm">
                  {formatPrice(selected.price)}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="grid grid-cols-4 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <SpecCell label="Beds" value={selected.beds || "Studio"} />
                <SpecCell label="Baths" value={selected.baths} />
                <SpecCell label="Sqft" value={selected.sqft.toLocaleString()} />
                <SpecCell label="Built" value={selected.yearBuilt} />
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {selected.description}
              </p>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Features
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 font-semibold text-white">
                    {selected.agent.initials}
                  </div>
                  <div>
                    <div className="font-semibold">{selected.agent.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {selected.agent.agency} · {selected.agent.phone}
                    </div>
                  </div>
                </div>
                {!sent ? (
                  <form
                    className="mt-5 flex flex-col gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Your email"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500"
                    >
                      Contact {selected.agent.name.split(" ")[0]}
                    </button>
                  </form>
                ) : (
                  <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                    ✓ Message sent. {selected.agent.name.split(" ")[0]} will reply within 24 hours.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-xs text-slate-400">
        Demo product — fictional listings, fictional agents. © {new Date().getFullYear()} Solaris Estates.
      </footer>
    </main>
  );
}

function PropertyCard({
  property,
  onClick,
}: {
  property: Property;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <div
        className={`relative h-48 bg-gradient-to-br ${property.gradient} transition group-hover:scale-[1.02]`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {property.featured && (
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-900 backdrop-blur">
              Featured
            </span>
          )}
          {property.new && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
          {property.neighborhood}
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2.5 py-1 text-sm font-bold text-slate-900 backdrop-blur">
          {formatPrice(property.price)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-semibold leading-snug">{property.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {property.address}
        </p>
        <div className="mt-auto flex items-center gap-4 pt-1 text-xs text-slate-600 dark:text-slate-400">
          <span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {property.beds || "Studio"}
            </span>
            {property.beds > 0 ? " bd" : ""}
          </span>
          <span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {property.baths}
            </span>{" "}
            ba
          </span>
          <span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {property.sqft.toLocaleString()}
            </span>{" "}
            sqft
          </span>
          <span className="ml-auto rounded-full border border-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {property.type}
          </span>
        </div>
      </div>
    </button>
  );
}

function SpecCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
