import PageIntro from "@/components/ui/PageIntro";
import WishlistContent from "@/components/wishlist/WishlistContent";

export const metadata = {
  title: "Wishlist",
  description:
    "Your saved sneakers at SoleDistrict. Move a pair to your bag when you are ready.",
};

export default function WishlistPage() {
  return (
    <>
      <PageIntro
        eyebrow="Saved for later"
        title="Your wishlist."
        breadcrumbs={[{ label: "Wishlist" }]}
        description="The pairs you have your eye on. Saved locally on this device and ready when you are."
      />
      <WishlistContent />
    </>
  );
}
