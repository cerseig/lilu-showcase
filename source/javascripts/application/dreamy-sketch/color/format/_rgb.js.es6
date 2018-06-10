Application.DreamySketch.Color.Format.Rgb = class Rgb extends Application.DreamySketch.Color.Format {
  get value() {
    return 'rgb(' + [this.color.r, this.color.g, this.color.b].join(', ') + ')';
  }

  set value(v) {
    this.constructor.match(v, (r, g, b) => {
      this.color.r = r;
      this.color.g = g;
      this.color.b = b;
    });
  }

  static get pattern() {
    return /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
  }
}
