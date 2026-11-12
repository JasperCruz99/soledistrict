import PolicyPage from "@/components/legal/PolicyPage";

export const metadata = {
  title: "Terms of Use",
  description:
    "Sample terms for using the SoleDistrict frontend demo, a fictional sneaker storefront with no real orders or payments.",
};

const sections = [
  {
    heading: "A demo, not a store",
    paragraphs: [
      "SoleDistrict is a fictional storefront built to demonstrate a modern ecommerce experience. Nothing on this site is a real commercial offer.",
      "You cannot buy a product, place a real order, make a payment, arrange shipping, or start a return through this demo. The checkout flow is a simulation and the confirmation screen does not create an order.",
    ],
  },
  {
    heading: "Sample catalogue and reviews",
    paragraphs: [
      "Brand names, product names, descriptions, prices, stock levels, ratings, review counts, and customer comments are invented sample content. They are shown to illustrate how a completed store might present information.",
    ],
    bullets: [
      "Product availability and sizing do not represent real inventory.",
      "Reviews and ratings are illustrative, not verified customer feedback.",
      "Shipping estimates, return windows, and discount codes are sample rules only.",
      "No product name or brand is intended to imply an endorsement or partnership.",
    ],
  },
  {
    heading: "Your bag and saved items",
    paragraphs: [
      "The bag, wishlist, and recently viewed list are stored only in your browser. They are not tied to an account and are not available on another device.",
      "Clearing your browser's site data removes these items. The demo does not have a way to recover them.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "You may browse the demo and explore its interactions. Please do not attempt to disrupt the site, bypass its security measures, or use it to distribute harmful code.",
      "Do not submit real personal, financial, or sensitive information through the demo forms. They are not connected to a secure backend and do not send or store submissions.",
    ],
  },
  {
    heading: "Content and intellectual property",
    paragraphs: [
      "The SoleDistrict name, site copy, and interface are part of this fictional demonstration. Third-party names, marks, or imagery shown on the site remain the property of their respective owners and are used for demonstration purposes only.",
      "You may not present this demo's fictional branding or content as a live commercial store or imply that SoleDistrict is a real retailer.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "Social links and email links may take you to services operated by other companies. This demo does not control those services and is not responsible for their content, availability, or privacy practices.",
    ],
  },
  {
    heading: "No warranties",
    paragraphs: [
      "This demo is provided as is for portfolio and evaluation purposes. It may contain errors, incomplete flows, or sample content that would not be suitable in a live store.",
      "The site does not promise uninterrupted availability, accuracy, or fitness for a particular purpose. To the extent permitted by applicable law, no liability is accepted for reliance on the demo or its sample content.",
    ],
  },
  {
    heading: "Questions",
    paragraphs: [
      "These are sample terms, not a legally reviewed commercial agreement. For questions about the demonstration, use the contact page to see the sample support details.",
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      current="/policies/terms"
      title="Terms of use."
      description="The ground rules for a fictional sneaker demo: no real orders, no payments, and clearly labelled sample content."
      updated="November 2026"
      sections={sections}
    />
  );
}
