Application.DreamySketch.Brush.Shape.Line = class Line extends Application.DreamySketch.Brush.Shape {
  constructor() {
    super();
    this.origin = new Application.DreamySketch.Vector();
    this.destination = new Application.DreamySketch.Vector();
    this.stroked = true;
    this.filled = false;
    this.width = 1;
  }

  path(context) {
    context.moveTo(this.origin.x, this.origin.y);
    context.lineTo(this.destination.x, this.destination.y);
  }

  stroke(context) {
    context.lineWidth = this.width;
    super.stroke(context);
  }
}
