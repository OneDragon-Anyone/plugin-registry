import {
  createDarkTheme,
  createLightTheme,
  type BrandVariants,
  type Theme
} from "@fluentui/react-components";

/** Win11 强调色（#0078D4）展开的 16 阶品牌 ramp，供 Fluent 生成完整语义色。 */
const windowsBrand: BrandVariants = {
  10: "#020305",
  20: "#0B1620",
  30: "#0D2436",
  40: "#0D324C",
  50: "#0C4162",
  60: "#0A5079",
  70: "#085F90",
  80: "#0078D4",
  90: "#0F8CE0",
  100: "#2F9CE8",
  110: "#4CACEF",
  120: "#68BCF5",
  130: "#82CBF9",
  140: "#9BD9FC",
  150: "#B4E7FE",
  160: "#CDEFFF"
};

const fontFamilyBase =
  '"Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif';
const fontFamilyMonospace =
  '"Cascadia Mono", "Cascadia Code", "Consolas", "Microsoft YaHei UI", monospace';

const shared: Partial<Theme> = {
  fontFamilyBase,
  fontFamilyMonospace,
  shadow2: "0 1px 2px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.06)",
  shadow4: "0 2px 6px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.06)",
  shadow8: "0 4px 12px rgba(0, 0, 0, 0.12), 0 0 3px rgba(0, 0, 0, 0.07)"
};

const lightOverrides: Partial<Theme> = {
  colorBrandBackground: "#005FB8",
  colorBrandBackgroundHover: "#106EBE",
  colorBrandBackgroundPressed: "#0A4A8C",
  colorBrandBackgroundSelected: "#0A4A8C",
  colorBrandForeground1: "#0067C0",
  colorBrandForeground2: "#005FB8",
  colorBrandForegroundLink: "#0067C0",
  colorBrandForegroundLinkHover: "#0F6CBD",
  colorBrandForegroundLinkPressed: "#0A4A8C",
  colorBrandStroke1: "#0078D4",
  colorBrandStroke2: "#C7E0F4",
  colorNeutralForegroundOnBrand: "#FFFFFF",

  colorNeutralBackground1: "#FFFFFF",
  colorNeutralBackground2: "#FAFAFA",
  colorNeutralBackground3: "#F3F3F3",
  colorNeutralBackground4: "#EEEEEE",
  colorNeutralBackground5: "#E8E8E8",
  colorNeutralForeground1: "#1B1B1B",
  colorNeutralForeground2: "#5C5C5C",
  colorNeutralForeground3: "#7A7A7A",
  colorNeutralStroke1: "#D6D6D6",
  colorNeutralStroke2: "#E5E5E5",
  colorNeutralStrokeAccessible: "#616161",

  colorPaletteGreenForeground1: "#0F7B0F",
  colorPaletteDarkOrangeForeground2: "#9D5D00",
  colorPaletteRedForeground1: "#C42B1C"
};

const darkOverrides: Partial<Theme> = {
  colorBrandBackground: "#4CC2FF",
  colorBrandBackgroundHover: "#60CDFF",
  colorBrandBackgroundPressed: "#3AA9E0",
  colorBrandBackgroundSelected: "#3AA9E0",
  colorBrandForeground1: "#60CDFF",
  colorBrandForeground2: "#8BDDFF",
  colorBrandForegroundLink: "#60CDFF",
  colorBrandForegroundLinkHover: "#8BDDFF",
  colorBrandForegroundLinkPressed: "#3AA9E0",
  colorBrandStroke1: "#4CC2FF",
  colorBrandStroke2: "#0B4A6C",
  colorNeutralForegroundOnBrand: "#000000",

  colorNeutralBackground1: "#2B2B2B",
  colorNeutralBackground1Hover: "#323232",
  colorNeutralBackground1Pressed: "#262626",
  colorNeutralBackground2: "#242424",
  colorNeutralBackground2Hover: "#2B2B2B",
  colorNeutralBackground3: "#202020",
  colorNeutralBackground4: "#1C1C1C",
  colorNeutralBackground5: "#181818",
  colorNeutralForeground1: "#FFFFFF",
  colorNeutralForeground2: "#C9C9C9",
  colorNeutralForeground3: "#9A9A9A",
  colorNeutralStroke1: "#474747",
  colorNeutralStroke2: "#3D3D3D",
  colorNeutralStrokeAccessible: "#8A8A8A",

  colorPaletteGreenForeground1: "#6CCB5F",
  colorPaletteDarkOrangeForeground2: "#FCE100",
  colorPaletteRedForeground1: "#FF99A4"
};

export type ThemeMode = "light" | "dark";

export const win11LightTheme: Theme = {
  ...createLightTheme(windowsBrand),
  ...shared,
  ...lightOverrides
};

export const win11DarkTheme: Theme = {
  ...createDarkTheme(windowsBrand),
  ...shared,
  ...darkOverrides
};

export const win11Themes: Record<ThemeMode, Theme> = {
  light: win11LightTheme,
  dark: win11DarkTheme
};
