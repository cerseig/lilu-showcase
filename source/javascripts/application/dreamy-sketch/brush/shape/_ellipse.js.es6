Application.DreamySketch.Brush.Shape.Ellipse = class Ellipse extends Application.DreamySketch.Brush.Shape {
  constructor() {
    super();
    this.position = new Application.DreamySketch.Vector();
    this.size = new Application.DreamySketch.Vector.Size();
    this.begining = 0;
    this.ending = 1;
    this.rotation = 0;
  }

  path(context) {
    context.ellipse(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
      this.rotation,
      this.begining*Math.PI*2,
      this.ending*Math.PI*2
    );
  }
}
