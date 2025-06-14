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

  clone(props?: Partial<ThemeProps>): Theme {
    return new Theme({
      background: this.background,
      foreground: this.foreground,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      borderRadius: this.borderRadius,
      ...props,
    });
  }
}
