"use client";

import Modal from "@/components/ui/Modal";

const conversions = {
  7: { eu: "40", uk: "6", cm: "25" },
  7.5: { eu: "40.5", uk: "6.5", cm: "25.4" },
  8: { eu: "41", uk: "7", cm: "26" },
  8.5: { eu: "42", uk: "7.5", cm: "26.7" },
  9: { eu: "42.5", uk: "8", cm: "27.3" },
  9.5: { eu: "43", uk: "8.5", cm: "27.9" },
  10: { eu: "44", uk: "9", cm: "28.6" },
  10.5: { eu: "44.5", uk: "9.5", cm: "29.2" },
  11: { eu: "45", uk: "10", cm: "29.8" },
  12: { eu: "46", uk: "11", cm: "30.5" },
};

export default function SizeGuideModal({ open, onClose, sizes }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Size guide"
      eyebrow="Find your fit"
      className="sm:max-w-xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Sample shoe size conversions
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                US
              </th>
              <th className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                EU
              </th>
              <th className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                UK
              </th>
              <th className="py-2 pl-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                CM
              </th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => {
              const row = conversions[size] ?? {
                eu: "—",
                uk: "—",
                cm: "—",
              };
              return (
                <tr key={size} className="border-b border-border/70 last:border-0">
                  <td className="py-2.5 pr-4 font-medium">{size}</td>
                  <td className="px-4 py-2.5 text-muted">{row.eu}</td>
                  <td className="px-4 py-2.5 text-muted">{row.uk}</td>
                  <td className="py-2.5 pl-4 text-muted">{row.cm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs leading-relaxed text-muted">
        <p>
          Measure your foot from heel to longest toe and compare with the CM
          column. Our silhouettes run true to size unless noted on the product.
        </p>
        <p>Between sizes? We recommend sizing up for a roomier fit.</p>
        <p className="text-[10px] uppercase tracking-[0.12em]">
          Sample size chart for this demo storefront.
        </p>
      </div>
    </Modal>
  );
}
