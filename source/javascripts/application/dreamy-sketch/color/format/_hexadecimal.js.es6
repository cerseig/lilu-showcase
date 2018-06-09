Application.DreamySketch.Color.Format.Hexadecimal = class Hexadecimal extends Application.DreamySketch.Color.Format {
  get value() {
    return '#' + this.convert(this.r) + this.convert(this.g) + this.convert(this.b);
  }

  set value(v) {
    this.constructor.match(v, (r, g, b) => {
      this.color.r = this.constructor.resolve(r);
      this.color.g = this.constructor.resolve(g);
      this.color.b = this.constructor.resolve(b);
    });
  }

  static get pattern() {
    return [/^#([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})$/i, /^#([0-9a-z])([0-9a-z])([0-9a-z])$/i];
  }

  static convert(value) {
    value = value.toString(value, 16);
    return (value.length < 2 ? '0' : '') + value;
  }

  static resolve(value) {
    return parseInt(value.length < 2 ? value + value : value, 16);
  }
}
