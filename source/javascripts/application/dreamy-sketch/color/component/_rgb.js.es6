Application.DreamySketch.Color.Component.Rgb = class Rgb extends Application.DreamySketch.Color.Component {
  static cast(value) {
    return parseInt(value, 10);
  }

  static get maximum() {
    return 255;
  }

  static filter(value) {
    return Math.round(value);
  }
}
