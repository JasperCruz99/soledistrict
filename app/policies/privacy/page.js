import PolicyPage from "@/components/legal/PolicyPage";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Sample privacy information for the SoleDistrict frontend demo, including what is stored in your browser and what the demo forms collect.",
};

const sections = [
  {
    heading: "The short version",
    paragraphs: [
      "SoleDistrict is a fictional frontend demonstration, not a live retailer. This demo does not operate a customer database, process payments, or transmit the information you type into its forms to a server.",
      "The only shopping data it keeps is stored locally in your own browser so the cart, wishlist, and recently viewed list survive a page refresh.",
    ],
  },
  {
    heading: "What stays in your browser",
    paragraphs: [
      "The storefront uses browser localStorage for a small set of shopping preferences. This data stays on your device and is not visible to the site owner through this demo.",
    ],
    bullets: [
      "Your bag, including product, size, colour, and quantity selections.",
      "Your wishlist and recently viewed products.",
      "No account profile, password, shipping address, phone number, or payment card details are saved by the demo.",
    ],
  },
  {
    heading: "What the forms do",
    paragraphs: [
      "The newsletter and contact forms validate your input in the browser and then display a simulated success message. They do not send an email, create a support ticket, add you to a mailing list, or store your submission.",
      "Checkout details such as name, email, phone, and address exist only in the current browser tab. Refreshing or closing the tab clears them. The checkout never collects card numbers, expiry dates, or security codes.",
      "Email links open your own email application. The demo address is fictional and is not a monitored support inbox.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "This demo does not add advertising cookies, analytics scripts, tracking pixels, or third-party marketing tags. It does not build a profile of your browsing activity.",
      "If the site is hosted on a third-party platform, that provider may process standard technical request logs under its own privacy terms. Those logs are separate from the demo forms and localStorage.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can clear the demo's cart, wishlist, and recently viewed data at any time by clearing site data in your browser settings. Using a private browsing window also limits what is retained after the window closes.",
      "Because the contact and newsletter forms are simulations, please do not enter real personal, financial, or sensitive information into them.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "This sample policy may change as the demo evolves. Any update would appear on this page with a revised date.",
      "For questions about the demo, use the contact page to see the sample support details and message form.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      current="/policies/privacy"
      title="Privacy policy."
      description="What this demo stores, what its forms do, and the choices you have over local shopping data."
      updated="November 2026"
      sections={sections}
    />
  );
}
