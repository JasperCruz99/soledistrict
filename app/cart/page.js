import PageIntro from "@/components/ui/PageIntro";
import CartContent from "@/components/cart/CartContent";

export const metadata = {
  title: "Shopping Bag",
  description:
    "Review the sneakers in your SoleDistrict bag, adjust quantities and continue to the demo checkout.",
};

export default function CartPage() {
  return (
    <>
      <PageIntro
        eyebrow="Your selection"
        title="Your bag."
        breadcrumbs={[{ label: "Cart" }]}
        description="Review your pairs, adjust quantities and apply a sample discount code before heading to the demo checkout."
      />
      <CartContent />
    </>
  );
}
