export default function AnnouncementBar() {
  return (
    <div className="bg-foreground text-dark-text">
      <div className="shell flex min-h-9 items-center justify-center py-2">
        <p className="text-center text-[10px] font-medium uppercase leading-tight tracking-[0.16em] sm:text-[11px]">
          Free shipping on orders over $100
        </p>
      </div>
    </div>
  );
}
