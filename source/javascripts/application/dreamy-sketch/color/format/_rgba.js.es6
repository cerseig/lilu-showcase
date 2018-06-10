Application.DreamySketch.Color.Format.Rgba = class Rgba extends Application.DreamySketch.Color.Format {
  get value() {
    return 'rgba(' + [this.color.r, this.color.g, this.color.b, this.color.a].join(', ') + ')';
  }

  set value(v) {
    this.constructor.match(v, (r, g, b, a) => {
      this.color.r = r;
      this.color.g = g;
      this.color.b = b;
      this.color.a = a;
    });
  }

  static get pattern() {
    return /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*((:?\d*\.)?\d+)\s*\)$/;
  }
}
