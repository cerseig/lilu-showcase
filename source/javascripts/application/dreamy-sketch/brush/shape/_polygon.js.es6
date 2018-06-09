Application.DreamySketch.Brush.Shape.Polygon = class Polygon extends Application.DreamySketch.Brush.Shape {
  constructor() {
    super();
    this.vectors = new Application.DreamySketch.Vector.List();
  }

  path(context) {
    this.vectors.each(vector => context.lineTo(vector.x, vector.y));
  }
}
