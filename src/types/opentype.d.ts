declare module 'opentype.js' {
  namespace opentype {
    interface GlyphPath {
      toPathData(precision?: number): string;
    }

    interface Glyph {
      advanceWidth: number;
      getPath(x: number, y: number, fontSize: number): GlyphPath;
    }

    interface Font {
      unitsPerEm: number;
      charToGlyph(char: string): Glyph;
    }
  }

  const opentype: {
    load(source: string): Promise<opentype.Font>;
    load(source: string, callback: (err: unknown, font?: opentype.Font) => void): void;
  };

  export default opentype;
}
