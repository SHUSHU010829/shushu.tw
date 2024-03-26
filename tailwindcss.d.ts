// tailwindcss.d.ts
declare module "tailwindcss/lib/util/flattenColorPalette" {
  function flattenColorPalette(
    colors: Record<string, any>
  ): Record<string, string>;
  export = flattenColorPalette;
}
