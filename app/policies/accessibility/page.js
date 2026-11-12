import PolicyPage from "@/components/legal/PolicyPage";

export const metadata = {
  title: "Accessibility",
  description:
    "The accessibility practices behind the SoleDistrict demo, its known limitations, and how to share feedback.",
};

const sections = [
  {
    heading: "Our approach",
    paragraphs: [
      "SoleDistrict aims to be usable by keyboard, screen reader, magnification, and reduced-motion users. The build follows accessible patterns from the Web Content Accessibility Guidelines (WCAG) 2.2 AA where practical.",
      "This is a demonstration project, not a formally audited or certified accessible product. The statement below describes what has been built and where the demo still has limits.",
    ],
  },
  {
    heading: "What is in place",
    paragraphs: [
      "Accessibility was considered as part of the interface rather than added as a separate layer. The following patterns are present throughout the storefront.",
    ],
    bullets: [
      "A skip link, landmark regions, and a logical heading order.",
      "Keyboard support for menus, filters, dialogs, the image gallery, quantity controls, and forms.",
      "Visible focus outlines that are not clipped by overflow containers.",
      "Form labels, error messages, live regions, and descriptive button names.",
      "Reduced-motion support and responsive layouts that work with text zoom.",
      "Alternative text for editorial imagery and a local image fallback.",
      "Colour choices intended to keep text and controls distinct, including on the dark footer.",
    ],
  },
  {
    heading: "Known limitations",
    paragraphs: [
      "No formal accessibility audit has been completed, and the demo has not been tested with every browser, operating system, or assistive technology combination.",
      "The contact and newsletter forms simulate success rather than sending a message, so they cannot be used to reach a real support team. Social links lead to external platforms whose accessibility is outside this project's control.",
      "Some sample product imagery and review content are illustrative. If a detail is conveyed only by an image in a future version, it should also be described in text.",
    ],
  },
  {
    heading: "Feedback",
    paragraphs: [
      "Accessibility feedback is welcome. In a live storefront, the contact form would be the fastest route for reporting a barrier.",
      "In this demo, use the contact page to see the sample support details. A useful report would include the page, the task you were trying to complete, and the browser or assistive technology you used.",
    ],
  },
  {
    heading: "Ongoing improvements",
    paragraphs: [
      "The storefront is reviewed as new sections are added. Future work should include manual keyboard passes, screen reader checks, contrast testing, and testing at increased text sizes before any production launch.",
      "This statement will be updated if a formal audit is completed or if known limitations are resolved.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <PolicyPage
      current="/policies/accessibility"
      title="Accessibility."
      description="The practices built into this storefront, the limitations of the demo, and how to share accessibility feedback."
      updated="November 2026"
      sections={sections}
    />
  );
}
