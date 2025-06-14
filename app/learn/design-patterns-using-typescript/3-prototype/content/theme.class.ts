type ThemeProps = {
  background: string;
  foreground: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
};

export class Theme {
  constructor({
    background,
    foreground,
    fontSize,
    fontFamily,
    borderRadius,
  }: ThemeProps) {
    this.background = background;
    this.foreground = foreground;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.borderRadius = borderRadius;
  }
  background: string;
  foreground: string;
  fontSize: number;
  fontFamily: string;
  borderRadius: number;
}
