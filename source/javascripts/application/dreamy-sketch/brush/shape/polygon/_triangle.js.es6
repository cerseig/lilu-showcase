Application.DreamySketch.Brush.Shape.Triangle = class Triangle extends Application.DreamySketch.Brush.Shape.Polygon {
  constructor() {
    super()
    this.position = new Application.DreamySketch.Vector();
    this.size = new Application.DreamySketch.Vector.Size();
  }

  get vectors() {
    return (new Application.DreamySketch.Vector.List()).push(
      this.position.add(this.size.horizontal.divide(2)),
      this.position.add(this.size),
      this.position.add(this.size.vertical)
    );
  }
}
