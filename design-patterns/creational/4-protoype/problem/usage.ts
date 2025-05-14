import { Theme } from "./theme.class";

const defaultTheme = new Theme({
  background: "#ffffff",
  foreground: "#222222",
  fontSize: 16,
  fontFamily: "Arial",
  borderRadius: 4,
});

const lightTheme = new Theme({
  background: defaultTheme.background,
  foreground: defaultTheme.foreground,
  fontSize: defaultTheme.fontSize,
  fontFamily: defaultTheme.fontFamily,
  borderRadius: defaultTheme.borderRadius,
});

const darkTheme = new Theme({
  background: "#222222",
  foreground: "#ffffff",
  fontSize: defaultTheme.fontSize,
  fontFamily: defaultTheme.fontFamily,
  borderRadius: defaultTheme.borderRadius,
});

const highContrastTheme = new Theme({
  background: "#000000",
  foreground: "#ffff00",
  fontSize: defaultTheme.fontSize,
  fontFamily: "Verdana",
  borderRadius: defaultTheme.borderRadius,
});
