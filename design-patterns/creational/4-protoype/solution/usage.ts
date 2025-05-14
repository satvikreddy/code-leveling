import { Theme } from "./theme.class";

const defaultTheme = new Theme({
  background: "#ffffff",
  foreground: "#222222",
  fontSize: 16,
  fontFamily: "Arial",
  borderRadius: 4,
});

export const lightThemePrototype = defaultTheme.clone();

export const darkThemePrototype = defaultTheme.clone({
  background: "#222222",
  foreground: "#ffffff",
});

export const highContrastThemePrototype = defaultTheme.clone({
  background: "#000000",
  foreground: "#ffff00",
  fontFamily: "Verdana",
});
