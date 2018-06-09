Application.DreamySketch.Brush.Shape.Ellipse.Circle = class Circle extends Application.DreamySketch.Brush.Shape.Ellipse {
  constructor() {
    super();
    this.size = 0;
  }

  path(context) {
    context.ellipse(
      this.position.x,
      this.position.y,
      this.size/2,
      this.size/2,
      this.rotation,
      this.begining*Math.PI*2,
      this.ending*Math.PI*2
    );
  }
}
