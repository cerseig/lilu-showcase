Application.DreamySketch.Vector.Size = class Size extends Application.DreamySketch.Vector {
  get width() {
    return this.x;
  }

  set width(v) {
    this.x = v;
  }

  get height() {
    return this.y;
  }

  set height(v) {
    this.y = v;
  }
}
