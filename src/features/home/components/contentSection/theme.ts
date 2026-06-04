export type ContentSectionVariant = "home" | "category";

export const THEME_STYLES = [
  {
    variant: "home",
    sectionClassName: "",
    titleWrapperClassName: "",
    titleClassName: "",
    itemClassName: "",
    mediaClassName: "relative flex items-center justify-center bg-slate-50",
    imageClassName: "object-contain",
    imageSize: 135,
    titleTextClassName: "text-primary",
  },
  {
    variant: "category",
    sectionClassName: "relative bg-surface px-4 pb-4 pt-10 sm:px-6 sm:pb-6 sm:pt-12 mt-10",
    titleWrapperClassName:
      "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2",
    titleClassName:
      "!mx-auto !mb-0 w-fit rounded-full bg-background px-6 py-3 text-center font-black !text-[clamp(1.5rem,2.5vw,2.75rem)] leading-none text-text-primary shadow-[0_1px_8px_rgba(0,0,0,0.08)]",
    itemClassName: "",
    mediaClassName:
      "relative flex aspect-square w-full max-w-[170px] items-center justify-center rounded-full bg-background p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)]",
    imageClassName: "rounded-full object-contain",
    imageSize: 112,
    titleTextClassName: "text-text-primary",
  },
] as const;

export function getContentSectionTheme(variant: ContentSectionVariant) {
  return (
    THEME_STYLES.find((theme) => theme.variant === variant) ?? THEME_STYLES[0]
  );
}
