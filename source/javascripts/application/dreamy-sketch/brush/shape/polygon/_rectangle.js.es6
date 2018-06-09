Application.DreamySketch.Brush.Shape.Rectangle = class Rectangle extends Application.DreamySketch.Brush.Shape.Polygon {
  constructor() {
    super()
    this.position = new Application.DreamySketch.Vector();
    this.size = new Application.DreamySketch.Vector.Size();
  }

  get vectors() {
    return (new Application.DreamySketch.Vector.List()).push(
      this.position,
      this.position.add(this.size.horizontal),
      this.position.add(this.size),
      this.position.add(this.size.vertical)
    );
  }
}
