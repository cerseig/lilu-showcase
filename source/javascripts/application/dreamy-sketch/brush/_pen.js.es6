Application.DreamySketch.Brush.Pen = class Pen extends Application.DreamySketch.Brush {
  constructor() {
    super();
    this.color = Application.DreamySketch.Color.black;
    this.touches = new Application.DreamySketch.Touch.List();
    this.width = 4;
  }

  compute(touches, offset) {
    var line, circle, previous, width, speed;
    var shapes = new Application.DreamySketch.Brush.Shape.List();

    touches.each((touch, index) => {
      speed = touch.speed.abs.sum + 2;
      //this.width += (Math.max(30/speed, 1) - this.width)*0.5;

      if(speed >= 4 && this.touches.has(touch)) {
        line = new Application.DreamySketch.Brush.Shape.Line();
        line.origin = this.touches.get(touch.identifier).position;
        line.destination = touch.position;
        line.width = this.width;
        line.blur = true;
        line.color = this.color;

        shapes.push(line);
      }
      else {
        circle = new Application.DreamySketch.Brush.Shape.Ellipse.Circle();
        circle.size = this.width/2;
        circle.position = touch.position;
        circle.color = this.color;
        shapes.push(circle);
      }

      this.touches.push(touch.clone)
    });

    return shapes;
  }
}
