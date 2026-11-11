export const categories = [
  {
    name: "Lifestyle Sneakers",
    slug: "lifestyle-sneakers",
    image: "/images/category-lifestyle.jpg",
    description: "Clean silhouettes for every day off the clock.",
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    image: "/images/category-running.jpg",
    description: "Light, responsive pairs built to go the distance.",
  },
  {
    name: "Streetwear Essentials",
    slug: "streetwear-essentials",
    image: "/images/category-streetwear.jpg",
    description: "Statement footwear and everyday street staples.",
  },
];

const standardSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];

export const products = [
  {
    id: 1,
    slug: "meridian-low",
    brand: "Northline",
    name: "Meridian Low",
    price: 145,
    category: "Lifestyle Sneakers",
    description:
      "A clean-lined low-top built for everyday rotation. Soft leather panels, a low-profile cupsole and a padded collar keep the Meridian Low easy to wear from morning commutes to late plans.",
    images: ["/images/meridian-low-1.jpg", "/images/category-lifestyle.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Bone", hex: "#E8E1D5" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Full-grain leather and mesh upper",
      "Padded collar and breathable mesh lining",
      "Compression-molded EVA midsole",
      "Rubber cupsole with a classic pivot point",
    ],
    fitNote: "True to size. If you are between sizes, we recommend sizing up.",
  },
  {
    id: 2,
    slug: "courtline-88",
    brand: "District Supply",
    name: "Courtline '88",
    price: 160,
    category: "Lifestyle Sneakers",
    description:
      "A court-inspired high-top with a vintage cut and modern comfort. The Courtline '88 layers brushed suede over a padded ankle and a gum-tinted sole for a pair that gets better with wear.",
    images: ["/images/courtline-88-1.jpg", "/images/ember-court-1.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Sand", hex: "#C9B79C" },
      { name: "Bone", hex: "#E8E1D5" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.6,
    reviewCount: 96,
    featured: false,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Brushed suede and canvas upper",
      "High-top padded ankle collar",
      "Vintage-tinted rubber cupsole",
      "Ortholite-style cushioned insole",
    ],
    fitNote: "Runs slightly narrow. Size up if you have a wider foot.",
  },
  {
    id: 3,
    slug: "studio-runner",
    brand: "Kestrel",
    name: "Studio Runner",
    price: 135,
    category: "Running Shoes",
    description:
      "Made for tempo days and long city miles. The Studio Runner uses a featherweight knit upper and a responsive foam midsole, with a sculpted heel that keeps every stride smooth.",
    images: ["/images/studio-runner-1.jpg", "/images/hero-levitate.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Storm", hex: "#6B6B6B" },
    ],
    rating: 4.7,
    reviewCount: 168,
    featured: true,
    isNew: false,
    bestSeller: false,
    available: true,
    features: [
      "Engineered knit upper with zonal ventilation",
      "Responsive nitrogen-infused foam midsole",
      "Internal heel counter for a locked-in stride",
      "High-abrasion rubber outsole",
    ],
    fitNote: "True to size with a performance fit. Allow a thumb's width of toe room.",
  },
  {
    id: 4,
    slug: "velocity-knit",
    brand: "Kestrel",
    name: "Velocity Knit",
    price: 150,
    category: "Running Shoes",
    description:
      "A lightweight daily trainer with a bold volt finish. The Velocity Knit trades bulk for bounce, pairing a breathable one-piece upper with a springy foam platform made for quick turnover.",
    images: ["/images/velocity-knit-1.jpg", "/images/velocity-knit-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Volt", hex: "#D9FF43" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.9,
    reviewCount: 58,
    featured: false,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Seamless engineered mesh upper",
      "Springy foam midsole with 8mm drop",
      "Reflective heel detail",
      "Durable carbon-rubber outsole",
    ],
    fitNote: "True to size. Designed for a close, race-ready fit.",
  },
  {
    id: 5,
    slug: "terra-glide",
    brand: "Form&Field",
    name: "Terra Glide",
    price: 125,
    category: "Running Shoes",
    description:
      "A cushioned everyday runner with a sculpted, chunky profile. The Terra Glide pairs a soft layered upper with a wide foam platform for a plush ride on pavement and park paths alike.",
    images: ["/images/terra-glide-1.jpg", "/images/hero-street.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Clay", hex: "#D9A183" },
      { name: "Stone", hex: "#B8B2A6" },
      { name: "Cream", hex: "#EFE8D8" },
    ],
    rating: 4.5,
    reviewCount: 302,
    featured: false,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Mixed mesh and synthetic upper",
      "Wide, stable foam midsole",
      "Plush heel and tongue padding",
      "Segmented rubber outsole for flexibility",
    ],
    fitNote: "Sizing runs true. The roomy toe box suits wider feet.",
  },
  {
    id: 6,
    slug: "streetline-hi",
    brand: "District Supply",
    name: "Streetline Hi",
    price: 110,
    category: "Streetwear Essentials",
    description:
      "A canvas high-top with a downtown attitude. The Streetline Hi keeps things classic with metal eyelets, a vulcanized sole and a padded collar, finished in a deep crimson that wears in beautifully.",
    images: ["/images/streetline-hi-1.jpg", "/images/streetline-hi-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Crimson", hex: "#B3202A" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.4,
    reviewCount: 141,
    featured: false,
    isNew: false,
    bestSeller: false,
    available: true,
    features: [
      "12oz heavyweight canvas upper",
      "Vulcanized rubber sidewall",
      "Metal eyelets and cotton laces",
      "Cushioned Ortholite-style insole",
    ],
    fitNote: "True to size. Canvas softens and relaxes with wear.",
  },
  {
    id: 7,
    slug: "ember-court",
    brand: "Baseline",
    name: "Ember Court",
    price: 170,
    category: "Lifestyle Sneakers",
    description:
      "A hardwood classic reworked for the street. The Ember Court carries a layered leather upper, a sculpted collar and an ember-red accent that pops against a black base.",
    images: ["/images/ember-court-1.jpg", "/images/campaign-color.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Team Red", hex: "#C0392B" },
    ],
    rating: 4.8,
    reviewCount: 265,
    featured: false,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Layered leather and nubuck upper",
      "Encapsulated cushioning unit",
      "Padded high-cut collar",
      "Solid rubber outsole with heritage tread",
    ],
    fitNote: "True to size. A snug, supportive fit through the midfoot.",
  },
  {
    id: 8,
    slug: "mono-runner",
    brand: "Northline",
    name: "Mono Runner",
    price: 140,
    category: "Running Shoes",
    description:
      "A monochrome runner with a minimalist edge. Clean lines, a low-profile silhouette and a soft foam core make the Mono Runner the quiet achiever of your rotation.",
    images: ["/images/mono-runner-1.jpg", "/images/mono-runner-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Grey", hex: "#9CA3AF" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.6,
    reviewCount: 88,
    featured: false,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Smooth synthetic leather upper",
      "Low-profile EVA midsole",
      "Perforated toe for breathability",
      "Durable rubber outsole",
    ],
    fitNote: "True to size. A slightly roomier fit than our performance runners.",
  },
  {
    id: 9,
    slug: "cloudline-92",
    brand: "Aurora",
    name: "Cloudline '92",
    price: 155,
    category: "Lifestyle Sneakers",
    description:
      "Soft pastels and a plush platform, inspired by early-'90s court style. The Cloudline '92 is an easy statement pair that works with everything from denim to tailored layers.",
    images: ["/images/cloudline-92-1.jpg", "/images/cloudline-92-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Pastel", hex: "#B7D8EF" },
      { name: "White", hex: "#FFFFFF" },
    ],
    rating: 4.5,
    reviewCount: 73,
    featured: false,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Soft leather upper with pastel overlays",
      "Padded low-profile collar",
      "Stacked foam midsole",
      "Non-marking rubber outsole",
    ],
    fitNote: "True to size. The padded collar makes for a snug initial fit.",
  },
  {
    id: 10,
    slug: "drift-canvas",
    brand: "Form&Field",
    name: "Drift Canvas",
    price: 95,
    category: "Streetwear Essentials",
    description:
      "A wardrobe workhorse in washed canvas. The Drift Canvas has a low, skate-inspired profile and a grippy waffle sole, made for long days on your feet.",
    images: ["/images/drift-canvas-1.jpg", "/images/drift-canvas-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Maroon", hex: "#6B1F2A" },
      { name: "Navy", hex: "#1F2A44" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.3,
    reviewCount: 189,
    featured: false,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Washed cotton canvas upper",
      "Waffle-pattern rubber outsole",
      "Padded footbed for all-day wear",
      "Reinforced heel and toe",
    ],
    fitNote: "True to size. A classic, slightly tapered fit.",
  },
  {
    id: 11,
    slug: "signal-max",
    brand: "Aurora",
    name: "Signal Max",
    price: 165,
    category: "Lifestyle Sneakers",
    description:
      "Our most-wanted silhouette. The Signal Max blends a layered runner upper with visible cushioning and hits of signal orange — a future classic that looks as good as it feels.",
    images: ["/images/signal-max-1.jpg", "/images/brand-story.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Bone / Orange", hex: "#E8CDB0" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.9,
    reviewCount: 342,
    featured: true,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Layered mesh, suede and leather upper",
      "Visible Max-style cushioning unit",
      "Padded collar with pull tab",
      "Rubber outsole with heritage waffle tread",
    ],
    fitNote: "True to size. Snug through the heel with a roomy forefoot.",
  },
  {
    id: 12,
    slug: "nord-trail",
    brand: "Kestrel",
    name: "Nord Trail",
    price: 145,
    category: "Running Shoes",
    description:
      "A trail-ready runner with city manners. Grip-first rubber, a protective toe bumper and a breathable upper make the Nord Trail ready for gravel, park loops and everything between.",
    images: ["/images/nord-trail-1.jpg", "/images/velocity-knit-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Olive", hex: "#6B6B4A" },
      { name: "Black", hex: "#171717" },
    ],
    rating: 4.7,
    reviewCount: 154,
    featured: false,
    isNew: false,
    bestSeller: false,
    available: false,
    features: [
      "Abrasion-resistant mesh upper",
      "Protective toe cap",
      "Aggressive lugged rubber outsole",
      "Gusseted tongue to keep debris out",
    ],
    fitNote: "True to size. Allow extra room for thicker trail socks.",
  },
  {
    id: 13,
    slug: "all-court-low",
    brand: "Baseline",
    name: "All Court Low",
    price: 130,
    category: "Lifestyle Sneakers",
    description:
      "The white sneaker, done properly. The All Court Low is cut from soft leather with a clean cupsole and subtle tonal stitching — a pair that earns its place in every wardrobe.",
    images: ["/images/all-court-low-1.jpg", "/images/meridian-low-1.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#9CA3AF" },
    ],
    rating: 4.8,
    reviewCount: 411,
    featured: true,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Soft full-grain leather upper",
      "Tonal stitching and a clean cupsole",
      "Removable cushioned footbed",
      "Durable court-inspired rubber outsole",
    ],
    fitNote: "True to size. Ideal for medium-width feet.",
  },
  {
    id: 14,
    slug: "skyline-trainer",
    brand: "Northline",
    name: "Skyline Trainer",
    price: 120,
    category: "Running Shoes",
    description:
      "An everyday cross-trainer with a lean profile. The Skyline Trainer is stable enough for gym floors and light enough for the run home, finished in a sharp black-and-cobalt mix.",
    images: ["/images/skyline-trainer-1.jpg", "/images/category-running.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Black", hex: "#171717" },
      { name: "Cobalt", hex: "#2554C7" },
    ],
    rating: 4.6,
    reviewCount: 227,
    featured: false,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Breathable mesh and synthetic upper",
      "Stable dual-density foam midsole",
      "Multi-directional outsole grip",
      "Reinforced heel for lateral support",
    ],
    fitNote: "True to size with a secure midfoot hold.",
  },
  {
    id: 15,
    slug: "apex-90",
    brand: "Aurora",
    name: "Apex 90",
    price: 180,
    category: "Streetwear Essentials",
    description:
      "Loud, layered and unmistakably now. The Apex 90 takes archive running details and turns the volume up, from the sculpted midsole to the electric red-and-black upper.",
    images: ["/images/apex-90-1.jpg", "/images/apex-90-2.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Red / Black", hex: "#8B1A1A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    rating: 4.9,
    reviewCount: 119,
    featured: true,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Sculpted layered upper with graphic overlays",
      "Visible Air-style cushioning",
      "Padded mesh collar",
      "Durable rubber outsole",
    ],
    fitNote: "Runs true to size. Size up for a roomier toe box.",
  },
  {
    id: 16,
    slug: "dune-low",
    brand: "District Supply",
    name: "Dune Low",
    price: 140,
    category: "Lifestyle Sneakers",
    description:
      "Warm neutrals, soft suede and a low-key court shape. The Dune Low is the kind of pair that quietly makes everything else in your outfit look better.",
    images: ["/images/dune-low-1.jpg", "/images/signal-max-1.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Tan", hex: "#B98B5E" },
      { name: "Cream", hex: "#EFE8D8" },
    ],
    rating: 4.4,
    reviewCount: 67,
    featured: false,
    isNew: true,
    bestSeller: false,
    available: true,
    features: [
      "Buttery suede and leather upper",
      "Tonal laces and stitching",
      "Cushioned foam footbed",
      "Gum rubber outsole",
    ],
    fitNote: "True to size. Suede will mold to your foot over time.",
  },
  {
    id: 17,
    slug: "rose-runner",
    brand: "Aurora",
    name: "Rose Runner",
    price: 150,
    category: "Lifestyle Sneakers",
    description:
      "A soft-hued runner with a retro soul. The Rose Runner pairs a suede-and-mesh upper with a sculpted midsole and muted rose tones for an easy everyday statement.",
    images: ["/images/rose-runner-1.jpg", "/images/cloudline-92-1.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Pink", hex: "#E8B4C8" },
      { name: "Grey", hex: "#9CA3AF" },
    ],
    rating: 4.7,
    reviewCount: 83,
    featured: false,
    isNew: false,
    bestSeller: false,
    available: true,
    features: [
      "Suede and mesh upper with rose overlays",
      "Sculpted foam midsole",
      "Padded collar and tongue",
      "Rubber outsole with traction pods",
    ],
    fitNote: "True to size. Medium width with a softly padded interior.",
  },
  {
    id: 18,
    slug: "baseline-court",
    brand: "Baseline",
    name: "Baseline Court",
    price: 115,
    category: "Streetwear Essentials",
    description:
      "A low-top court shoe with hardwood DNA. Clean lines, a contrast sole and a bold red finish make the Baseline Court an instant outfit anchor.",
    images: ["/images/baseline-court-1.jpg", "/images/ember-court-1.jpg"],
    sizes: standardSizes,
    colors: [
      { name: "Red", hex: "#C0392B" },
      { name: "White", hex: "#FFFFFF" },
    ],
    rating: 4.5,
    reviewCount: 176,
    featured: false,
    isNew: false,
    bestSeller: true,
    available: true,
    features: [
      "Leather and synthetic upper",
      "Padded low-top collar",
      "Cushioned EVA footbed",
      "Non-marking rubber outsole",
    ],
    fitNote: "True to size with a classic court fit.",
  },
];

export const brands = [...new Set(products.map((product) => product.brand))];

export const allSizes = [
  ...new Set(products.flatMap((product) => product.sizes)),
].sort((a, b) => a - b);

export const allColors = [
  ...new Map(
    products
      .flatMap((product) => product.colors)
      .map((color) => [color.name, color])
  ).values(),
].sort((a, b) => a.name.localeCompare(b.name));

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id)) ?? null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.id !== product.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getNewArrivals() {
  return products.filter((product) => product.isNew);
}

export function getBestSellers() {
  return [...products]
    .filter((product) => product.bestSeller)
    .sort((a, b) => b.reviewCount - a.reviewCount);
}

export function getFeaturedProducts(limit = 4) {
  return [...products]
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);
}
